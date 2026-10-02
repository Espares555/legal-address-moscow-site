import { useState } from "react";
import Icon from "@/components/ui/icon";
import { API } from "@/lib/api";

export const REVIEW_SERVICES = [
  "Юридический адрес",
  "Смена адреса",
  "Регистрация ООО",
  "Регистрация ИП",
  "Перевод из региона",
  "Почтовое обслуживание",
  "Продление договора",
  "Открытие счёта",
  "Другое",
];

const LABELS = ["", "Плохо", "Так себе", "Нормально", "Хорошо", "Отлично"];
const field =
  "w-full border border-line bg-background px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [service, setService] = useState(REVIEW_SERVICES[0]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (name.trim().length < 2) err.name = "Укажите имя";
    if (!rating) err.rating = "Поставьте оценку";
    if (text.trim().length < 20) err.text = "Напишите хотя бы пару предложений";
    setErrors(err);
    if (Object.keys(err).length) return;

    setState("sending");
    try {
      const r = await fetch(API.reviews, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, service, rating, text, website }),
      });
      const data = await r.json();
      if (!r.ok) {
        setErrors({ form: data.error || "Не удалось отправить отзыв" });
        setState("idle");
        return;
      }
      setState("sent");
    } catch {
      setErrors({ form: "Нет связи с сервером. Попробуйте ещё раз." });
      setState("idle");
    }
  };

  if (state === "sent") {
    return (
      <div className="animate-scale-in flex flex-col items-start gap-4 py-4">
        <span className="grid h-14 w-14 place-items-center bg-primary text-primary-foreground">
          <Icon name="Check" size={28} />
        </span>
        <h3 className="font-head text-[26px] font-extrabold tracking-[-0.02em]">Спасибо за отзыв!</h3>
        <p className="max-w-md text-muted-foreground">Он появится на сайте после проверки — обычно в течение одного рабочего дня.</p>
      </div>
    );
  }

  const shown = hover || rating;

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div>
        <span className="mb-2 block text-[14px] font-semibold">Ваша оценка</span>
        <div className="flex items-center gap-3" onMouseLeave={() => setHover(0)}>
          <div className="flex gap-1" role="radiogroup" aria-label="Оценка">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} из 5`}
                onMouseEnter={() => setHover(n)}
                onClick={() => setRating(n)}
                className="text-primary transition-transform hover:scale-110"
              >
                <Icon name="Star" size={30} className={n <= shown ? "fill-current" : "text-line"} />
              </button>
            ))}
          </div>
          <span className="text-[14px] font-medium text-muted-foreground">{LABELS[shown]}</span>
        </div>
        {errors.rating && <p className="mt-1 text-[13px] text-destructive">{errors.rating}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя *" maxLength={120} className={field} />
          {errors.name && <p className="mt-1 text-[13px] text-destructive">{errors.name}</p>}
        </div>
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Компания (необязательно)" maxLength={200} className={field} />
      </div>

      <select value={service} onChange={(e) => setService(e.target.value)} className={field} aria-label="Услуга">
        {REVIEW_SERVICES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Расскажите, как всё прошло *"
          rows={5}
          maxLength={3000}
          className={`${field} resize-y`}
        />
        {errors.text && <p className="mt-1 text-[13px] text-destructive">{errors.text}</p>}
      </div>

      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {errors.form && <p className="text-[14px] text-destructive">{errors.form}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex h-12 items-center gap-2 bg-primary px-6 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {state === "sending" ? <Icon name="Loader2" size={18} className="animate-spin" /> : <Icon name="Send" size={17} />}
        Отправить отзыв
      </button>
      <p className="text-[12.5px] text-muted-foreground">Отзыв появится на сайте после проверки модератором.</p>
    </form>
  );
}
