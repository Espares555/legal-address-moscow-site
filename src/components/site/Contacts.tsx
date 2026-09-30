import Icon from "@/components/ui/icon";
import RequestForm from "./RequestForm";
import { useReveal } from "@/hooks/use-reveal";

const INFO = [
  { icon: "Phone", label: "Телефон", value: "+7 495 123-45-67", href: "tel:+74951234567" },
  { icon: "Mail", label: "Почта", value: "hello@mercury-law.ru", href: "mailto:hello@mercury-law.ru" },
  { icon: "MapPin", label: "Офис", value: "Москва, ул. Тверская, 18к1, офис 305" },
  { icon: "Clock", label: "Часы работы", value: "Пн–Пт 9:00–20:00, Сб 10:00–16:00" },
];

export default function Contacts() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="contacts" ref={ref} className="scroll-mt-20 border-t border-line bg-background">
      <div className="mx-3 grid border-x border-line lg:mx-[18px] lg:grid-cols-[420px_1fr]">
        <div className="reveal border-b border-line px-6 py-14 lg:border-b-0 lg:border-r lg:py-16 lg:pl-14 lg:pr-10">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">07 / Контакты</span>
          <h2 className="mt-6 font-head text-[40px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[56px]">
            Подберём
            <br />
            адрес
            <br />
            <span className="text-primary">за 15 минут</span>
          </h2>
          <ul className="mt-10 space-y-5">
            {INFO.map((i) => (
              <li key={i.label} className="flex gap-4">
                <span className="grid h-10 w-10 flex-none place-items-center bg-surface text-primary">
                  <Icon name={i.icon} size={18} />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{i.label}</span>
                  {i.href ? (
                    <a href={i.href} className="font-semibold hover:text-primary">
                      {i.value}
                    </a>
                  ) : (
                    <span className="font-semibold">{i.value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal relative overflow-hidden bg-ink px-6 py-14 text-ink-foreground lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -right-24 top-0 hidden h-full w-[360px] lg:block" aria-hidden="true">
            <div className="absolute right-0 top-10 h-[52px] w-full origin-right -rotate-[28deg] bg-band-1/80" />
            <div className="absolute right-0 top-24 h-[52px] w-full origin-right -rotate-[28deg] bg-band-2/80" />
            <div className="absolute right-0 top-[152px] h-[52px] w-full origin-right -rotate-[28deg] bg-band-3/80" />
          </div>
          <div className="relative max-w-[520px]">
            <h3 className="font-head text-[32px] font-extrabold leading-tight tracking-[-0.02em]">Заявка на подбор</h3>
            <p className="mb-8 mt-3 text-ink-foreground/60">Опишите, что нужно, — пришлём 3–5 подходящих адресов с ценами.</p>
            <RequestForm dark />
          </div>
        </div>
      </div>
    </section>
  );
}
