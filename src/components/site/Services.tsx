import Icon from "@/components/ui/icon";
import { useReveal } from "@/hooks/use-reveal";

type Props = { onRequest: (plan?: string) => void };

const SERVICES = [
  {
    icon: "Building2",
    name: "Регистрация организаций (ООО)",
    desc: "Услуга по регистрации ООО, регистрации АО/ПАО и регистрации ИП",
    price: "от 4 900 ₽",
    color: "bg-band-1",
  },
  {
    icon: "Mail",
    name: "Почтовое обслуживание юридических адресов",
    desc: "Приём, хранение и пересылка корреспонденции, сканы писем и уведомления о заказных",
    price: "от 3 000 ₽",
    color: "bg-band-2",
  },
  {
    icon: "KeyRound",
    name: "Первичная аренда юридического адреса",
    desc: "Договор аренды и гарантийное письмо собственника для регистрации новой компании",
    price: "от 8 700 ₽",
    color: "bg-band-3",
  },
  {
    icon: "RefreshCw",
    name: "Сменить юридический адрес",
    desc: "Подбор нового адреса, подготовка документов и подача в ФНС под ключ",
    price: "от 6 500 ₽",
    color: "bg-band-4",
  },
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <div
              key={s.name}
              className="reveal group flex flex-col border-b border-line sm:border-r lg:last:border-r-0"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className={`h-2 ${s.color}`} />
              <div className="flex flex-1 flex-col p-6 lg:p-9">
                <span className="grid h-12 w-12 place-items-center bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={s.icon} size={22} />
                </span>
                <h3 className="mt-6 text-[20px] font-bold leading-snug tracking-[-0.01em]">{s.name}</h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-muted-foreground">{s.desc}</p>
                <p className="mt-6 font-head text-[30px] font-extrabold leading-none tracking-[-0.03em]">{s.price}</p>
                <button
                  onClick={() => onRequest(s.name)}
                  className="mt-6 h-12 bg-ink font-semibold text-ink-foreground transition-colors hover:bg-primary"
                >
                  Заказать
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
