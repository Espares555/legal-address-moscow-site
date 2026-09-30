import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

type Props = {
  subject?: string;
  dark?: boolean;
  onDone?: () => void;
  submitLabel?: string;
};

type Errors = Partial<Record<"name" | "phone" | "agree", string>>;

const formatPhone = (raw: string) => {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length) out += " " + p.slice(0, 3);
  if (p.length > 3) out += " " + p.slice(3, 6);
  if (p.length > 6) out += "-" + p.slice(6, 8);
  if (p.length > 8) out += "-" + p.slice(8, 10);
  return out;
};

export default function RequestForm({ subject = "", dark, onDone, submitLabel = "Подобрать адрес" }: Props) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState(subject);
  const [agree, setAgree] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => setComment(subject), [subject]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (name.trim().length < 2) err.name = "Укажите имя";
    if (phone.replace(/\D/g, "").length !== 11) err.phone = "Введите телефон полностью";
    if (!agree) err.agree = "Нужно согласие";
    setErrors(err);
    if (Object.keys(err).length) return;
    setSent(true);
    toast({ title: "Заявка принята", description: "Перезвоним в течение 15 минут в рабочее время." });
    onDone?.();
  };

  const field = dark
    ? "border-ink-foreground/20 bg-ink-foreground/5 text-ink-foreground placeholder:text-ink-foreground/40 focus:border-band-1"
    : "border-line bg-surface text-foreground placeholder:text-muted-foreground focus:border-primary";

  if (sent) {
    return (
      <div className="animate-scale-in flex flex-col items-start gap-4 py-6">
        <span className="grid h-14 w-14 place-items-center bg-primary text-primary-foreground">
          <Icon name="Check" size={28} />
        </span>
        <p className="font-head text-3xl font-extrabold tracking-[-0.02em]">Спасибо, {name.split(" ")[0]}!</p>
        <p className={dark ? "text-ink-foreground/70" : "text-muted-foreground"}>Менеджер свяжется с вами по номеру {phone} и подберёт адрес.</p>
        <button
          onClick={() => {
            setSent(false);
            setName("");
            setPhone("");
          }}
          className="font-semibold text-band-1 hover:underline"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4">
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" className={`h-12 w-full border px-4 outline-none transition-colors ${field}`} />
        {errors.name && <p className="mt-1 text-[13px] text-destructive">{errors.name}</p>}
      </div>
      <div>
        <input
          value={phone}
          inputMode="tel"
          onChange={(e) => setPhone(e.target.value ? formatPhone(e.target.value) : "")}
          placeholder="+7 ___ ___-__-__"
          className={`h-12 w-full border px-4 outline-none transition-colors ${field}`}
        />
        {errors.phone && <p className="mt-1 text-[13px] text-destructive">{errors.phone}</p>}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="ИФНС, округ или метро — что важно"
        rows={3}
        className={`w-full resize-none border px-4 py-3 outline-none transition-colors ${field}`}
      />
      <label className={`flex cursor-pointer items-start gap-3 text-[13px] ${dark ? "text-ink-foreground/60" : "text-muted-foreground"}`}>
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 h-4 w-4 accent-primary" />
        Согласен на обработку персональных данных
      </label>
      {errors.agree && <p className="-mt-2 text-[13px] text-destructive">{errors.agree}</p>}
      <button type="submit" className="mt-2 h-12 bg-primary font-semibold text-primary-foreground transition-colors hover:bg-band-3">
        {submitLabel}
      </button>
    </form>
  );
}
