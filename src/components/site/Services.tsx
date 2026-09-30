import Icon from "@/components/ui/icon";
import { useReveal } from "@/hooks/use-reveal";

type Props = { onRequest: (plan?: string) => void };

const PLANS = [
  {
    name: "Адрес",
    price: "от 8 700 ₽",
    term: "за 11 месяцев",
    color: "bg-band-1",
    items: ["Договор аренды и гарантийное письмо", "Адрес без массовой регистрации", "Подтверждение для ФНС"],
  },
  {
    name: "Адрес + почта",
    price: "от 12 900 ₽",
    term: "за 11 месяцев",
    color: "bg-band-2",
    featured: true,
    items: ["Всё из тарифа «Адрес»", "Приём и хранение корреспонденции", "Сканы писем в мессенджер", "Уведомление о заказных"],
  },
  {
    name: "Офис под ключ",
    price: "от 19 800 ₽",
    term: "за 11 месяцев",
    color: "bg-band-4",
    items: ["Всё из тарифа «Адрес + почта»", "Секретарь и ответы на звонки", "Переговорная 4 часа в месяц", "Рабочее место по запросу"],
  },
];

const EXTRA = [
  { icon: "FileText", title: "Регистрация ООО", price: "от 4 900 ₽" },
  { icon: "RefreshCw", title: "Смена юрадреса", price: "от 6 500 ₽" },
  { icon: "ShieldCheck", title: "Проверка адреса", price: "бесплатно" },
  { icon: "Truck", title: "Доставка документов", price: "от 700 ₽" },
];

export default function Services({ onRequest }: Props) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="services" ref={ref} className="scroll-mt-20 border-t border-line bg-background">
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <div className="grid gap-6 border-b border-line px-6 py-14 lg:grid-cols-[420px_1fr] lg:px-0 lg:py-0">
          <div className="reveal lg:border-r lg:border-line lg:py-16 lg:pl-14">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">03 / Услуги</span>
          </div>
          <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:px-14 lg:py-16">
            <h2 className="font-head text-[40px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[56px]">
              Услуги
              <br />и цены
            </h2>
            <p className="max-w-[340px] text-muted-foreground">Цена фиксируется в договоре. Никаких доплат за подписание и гарантийное письмо.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <div
              key={p.name}
              className={`reveal relative flex flex-col border-b border-line lg:border-r lg:last:border-r-0 ${p.featured ? "bg-ink text-ink-foreground" : ""}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className={`h-[52px] ${p.color} flex items-center gap-4 px-6 text-white lg:px-9`}>
                <span className="h-5 w-5 rounded-full border-[3px] border-white" />
                <span className="font-bold">{p.name}</span>
                {p.featured && <span className="ml-auto bg-white px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-band-4">Хит</span>}
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-9">
                <p className="font-head text-[44px] font-extrabold leading-none tracking-[-0.035em]">{p.price}</p>
                <p className={`mt-2 ${p.featured ? "text-ink-foreground/60" : "text-muted-foreground"}`}>{p.term}</p>
                <ul className="mt-8 space-y-3">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <Icon name="Check" size={18} className="mt-0.5 flex-none text-band-1" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onRequest(p.name)}
                  className={`mt-10 h-12 font-semibold transition-colors ${p.featured ? "bg-primary text-primary-foreground hover:bg-band-1" : "bg-ink text-ink-foreground hover:bg-primary"}`}
                >
                  Выбрать тариф
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {EXTRA.map((e) => (
            <button
              key={e.title}
              onClick={() => onRequest(e.title)}
              className="group flex items-center gap-4 border-b border-line px-6 py-6 text-left transition-colors hover:bg-surface sm:border-r lg:px-9"
            >
              <span className="grid h-11 w-11 flex-none place-items-center bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name={e.icon} size={20} />
              </span>
              <span>
                <span className="block font-bold">{e.title}</span>
                <span className="text-[13.5px] text-muted-foreground">{e.price}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
