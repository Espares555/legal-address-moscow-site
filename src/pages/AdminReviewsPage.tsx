import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { API } from "@/lib/api";
import { useSeo } from "@/lib/seo";

type Item = { id: number; name: string; company: string; rating: number; text: string; service: string; status: string; date: string };
type Status = "pending" | "approved" | "rejected" | "all";

const KEY = "merc_admin_pwd";
const TABS: { id: Status; label: string }[] = [
  { id: "pending", label: "На проверке" },
  { id: "approved", label: "Опубликованы" },
  { id: "rejected", label: "Отклонены" },
  { id: "all", label: "Все" },
];
const BADGE: Record<string, string> = {
  pending: "bg-band-1/20 text-primary",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};
const STATUS_RU: Record<string, string> = { pending: "На проверке", approved: "Опубликован", rejected: "Отклонён" };

export default function AdminReviewsPage() {
  const [pwd, setPwd] = useState(() => sessionStorage.getItem(KEY) || "");
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<Status>("pending");
  const [items, setItems] = useState<Item[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useSeo({ title: "Модерация отзывов | Меркурий", description: "Служебная страница", noindex: true });

  const load = useCallback(
    async (password: string, status: Status) => {
      setLoading(true);
      setError("");
      const r = await fetch(`${API.reviews}?admin=1&status=${status}`, { headers: { "X-Admin-Password": password } }).catch(() => null);
      setLoading(false);
      if (!r) return setError("Нет связи с сервером");
      if (r.status === 401) {
        sessionStorage.removeItem(KEY);
        setPwd("");
        return setError("Неверный пароль");
      }
      const d = await r.json();
      setItems(d.items);
      setCounts(d.counts || {});
      sessionStorage.setItem(KEY, password);
      setPwd(password);
    },
    [],
  );

  useEffect(() => {
    if (pwd) load(pwd, tab);
  }, [pwd, tab, load]);

  const act = async (id: number, method: "PUT" | "DELETE", status?: string) => {
    if (method === "DELETE" && !confirm("Удалить отзыв навсегда?")) return;
    await fetch(method === "DELETE" ? `${API.reviews}?id=${id}` : API.reviews, {
      method,
      headers: { "Content-Type": "application/json", "X-Admin-Password": pwd },
      body: JSON.stringify({ id, status }),
    });
    load(pwd, tab);
  };

  if (!pwd) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            load(input, tab);
          }}
          className="w-full max-w-sm border border-line bg-background p-8"
        >
          <Link to="/" className="font-head text-[24px] font-extrabold tracking-[-0.03em]">
            Меркурий<span className="text-primary">.</span>
          </Link>
          <h1 className="mt-6 text-[20px] font-bold">Модерация отзывов</h1>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Пароль администратора"
            autoFocus
            className="mt-5 w-full border border-line bg-surface px-4 py-3 outline-none focus:border-primary"
          />
          {error && <p className="mt-2 text-[14px] text-destructive">{error}</p>}
          <button disabled={loading || !input} className="mt-4 h-12 w-full bg-primary font-semibold text-primary-foreground disabled:opacity-60">
            {loading ? "Проверяю…" : "Войти"}
          </button>
        </form>
      </div>
    );
  }

  const total = (counts.pending || 0) + (counts.approved || 0) + (counts.rejected || 0);

  return (
    <div className="min-h-screen bg-surface">
      <header className="flex items-center justify-between border-b border-line bg-background px-5 py-4 lg:px-9">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-head text-[22px] font-extrabold tracking-[-0.03em]">
            Меркурий<span className="text-primary">.</span>
          </Link>
          <span className="text-muted-foreground">Модерация отзывов</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/reviews" target="_blank" className="hidden text-[14px] font-semibold text-primary hover:underline sm:inline">
            Открыть страницу отзывов
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem(KEY);
              setPwd("");
            }}
            className="inline-flex h-9 items-center gap-1.5 border border-line px-3 text-[14px] font-semibold hover:border-primary"
          >
            <Icon name="LogOut" size={15} /> Выйти
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-4 lg:p-8">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const n = t.id === "all" ? total : counts[t.id] || 0;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex h-10 items-center gap-2 border px-4 font-semibold transition-colors ${tab === t.id ? "border-primary bg-primary text-primary-foreground" : "border-line bg-background hover:border-primary"}`}
              >
                {t.label}
                <span className={`min-w-6 px-1.5 text-[12px] ${tab === t.id ? "bg-white/20" : "bg-surface"}`}>{n}</span>
              </button>
            );
          })}
        </div>

        {loading && <p className="mt-8 text-muted-foreground">Загружаю…</p>}
        {!loading && items.length === 0 && (
          <div className="mt-8 border border-dashed border-line bg-background p-10 text-center text-muted-foreground">
            {tab === "pending" ? "Новых отзывов нет — всё проверено." : "Здесь пока пусто."}
          </div>
        )}

        <ul className="mt-6 space-y-4">
          {items.map((r) => (
            <li key={r.id} className="border border-line bg-background p-5 lg:p-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Icon key={k} name="Star" size={16} className={k < r.rating ? "fill-current" : "text-line"} />
                  ))}
                </span>
                <span className="font-bold">{r.name}</span>
                {r.company && <span className="text-[14px] text-muted-foreground">{r.company}</span>}
                <span className="bg-surface px-2 py-0.5 text-[12px] font-semibold text-primary">{r.service}</span>
                <span className="ml-auto text-[13px] text-muted-foreground">{new Date(r.date).toLocaleDateString("ru-RU")}</span>
                <span className={`px-2 py-0.5 text-[12px] font-semibold ${BADGE[r.status]}`}>{STATUS_RU[r.status]}</span>
              </div>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-foreground/85">{r.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {r.status !== "approved" && (
                  <button onClick={() => act(r.id, "PUT", "approved")} className="inline-flex h-10 items-center gap-1.5 bg-primary px-4 font-semibold text-primary-foreground">
                    <Icon name="Check" size={16} /> Опубликовать
                  </button>
                )}
                {r.status !== "rejected" && (
                  <button onClick={() => act(r.id, "PUT", "rejected")} className="inline-flex h-10 items-center gap-1.5 border border-line px-4 font-semibold hover:border-primary">
                    <Icon name="EyeOff" size={16} /> {r.status === "approved" ? "Снять с публикации" : "Отклонить"}
                  </button>
                )}
                <button onClick={() => act(r.id, "DELETE")} className="ml-auto inline-flex h-10 items-center gap-1.5 px-3 font-semibold text-destructive hover:bg-red-50">
                  <Icon name="Trash2" size={16} /> Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
