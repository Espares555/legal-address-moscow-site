import json
import os
import hmac

import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p98561575_legal_address_moscow")
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Password",
    "Access-Control-Max-Age": "86400",
}
SERVICES = {
    "Юридический адрес", "Смена адреса", "Регистрация ООО", "Регистрация ИП",
    "Перевод из региона", "Почтовое обслуживание", "Продление договора", "Открытие счёта", "Другое",
}
STATUSES = {"pending", "approved", "rejected"}


def resp(code: int, data) -> dict:
    return {"statusCode": code, "headers": {**CORS, "Content-Type": "application/json"}, "body": json.dumps(data, ensure_ascii=False, default=str)}


def q(s: str) -> str:
    return "'" + s.replace("'", "''") + "'"


def is_admin(event: dict) -> bool:
    expected = os.environ.get("ADMIN_PASSWORD", "")
    headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
    given = headers.get("x-admin-password", "")
    return bool(expected) and hmac.compare_digest(given, expected)


def row(r) -> dict:
    return {"id": r[0], "name": r[1], "company": r[2], "rating": r[3], "text": r[4], "service": r[5], "status": r[6], "date": r[7].date().isoformat()}


COLS = "id, name, company, rating, text, service, status, created_at"


def handler(event: dict, context) -> dict:
    """Отзывы клиентов: приём новых отзывов, вывод одобренных и модерация администратором."""
    method = event.get("httpMethod", "GET")
    if method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    params = event.get("queryStringParameters") or {}
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    conn.autocommit = True
    cur = conn.cursor()

    if method == "GET":
        if params.get("admin"):
            if not is_admin(event):
                return resp(401, {"error": "Неверный пароль"})
            status = params.get("status", "pending")
            where = "" if status == "all" else f"WHERE status = {q(status)}" if status in STATUSES else "WHERE status = 'pending'"
            cur.execute(f"SELECT {COLS} FROM {SCHEMA}.reviews {where} ORDER BY created_at DESC LIMIT 500")
            items = [row(r) for r in cur.fetchall()]
            cur.execute(f"SELECT status, COUNT(*) FROM {SCHEMA}.reviews GROUP BY status")
            counts = {s: c for s, c in cur.fetchall()}
            return resp(200, {"items": items, "counts": counts})
        cur.execute(f"SELECT {COLS} FROM {SCHEMA}.reviews WHERE status = 'approved' ORDER BY created_at DESC LIMIT 200")
        return resp(200, {"items": [row(r) for r in cur.fetchall()]})

    body = json.loads(event.get("body") or "{}")

    if method == "POST":
        name = str(body.get("name", "")).strip()[:120]
        company = str(body.get("company", "")).strip()[:200]
        text = str(body.get("text", "")).strip()[:3000]
        service = str(body.get("service", "")).strip()
        service = service if service in SERVICES else "Другое"
        try:
            rating = int(body.get("rating", 0))
        except (TypeError, ValueError):
            rating = 0
        if str(body.get("website", "")).strip():
            return resp(200, {"ok": True})
        if len(name) < 2:
            return resp(400, {"error": "Укажите имя"})
        if not 1 <= rating <= 5:
            return resp(400, {"error": "Поставьте оценку от 1 до 5"})
        if len(text) < 20:
            return resp(400, {"error": "Напишите отзыв хотя бы в пару предложений"})
        cur.execute(
            f"INSERT INTO {SCHEMA}.reviews (name, company, rating, text, service) "
            f"VALUES ({q(name)}, {q(company)}, {rating}, {q(text)}, {q(service)}) RETURNING id"
        )
        return resp(200, {"ok": True, "id": cur.fetchone()[0]})

    if method == "PUT":
        if not is_admin(event):
            return resp(401, {"error": "Неверный пароль"})
        rid = int(body.get("id", 0))
        status = body.get("status")
        if status not in STATUSES:
            return resp(400, {"error": "Неверный статус"})
        cur.execute(f"UPDATE {SCHEMA}.reviews SET status = {q(status)}, moderated_at = NOW() WHERE id = {rid}")
        return resp(200, {"ok": True})

    if method == "DELETE":
        if not is_admin(event):
            return resp(401, {"error": "Неверный пароль"})
        rid = int(params.get("id") or body.get("id") or 0)
        cur.execute(f"DELETE FROM {SCHEMA}.reviews WHERE id = {rid}")
        return resp(200, {"ok": True})

    return resp(405, {"error": "Метод не поддерживается"})
