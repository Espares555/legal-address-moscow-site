import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { getService } from "@/data/services";

const SLUG = "otkrytie-raschetnogo-scheta";

export default function BankPartners() {
  const partners = getService(SLUG)?.partners ?? [];
  const url = `/services/${SLUG}`;

  return (
    <section className="border-t border-line bg-background">
      <div className="mx-3 grid border-x border-line lg:mx-[18px] lg:grid-cols-[420px_1fr]">
        <Link to={url} className="group flex flex-col justify-center gap-2 border-b border-line px-6 py-7 lg:border-b-0 lg:border-r lg:pl-14">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Банки-партнёры</span>
          <span className="text-[17px] font-bold leading-snug group-hover:text-primary">Откроем расчётный счёт бесплатно</span>
          <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted-foreground group-hover:text-primary">
            Подробнее <Icon name="ArrowRight" size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <div className="grid grid-cols-3">
          {partners.map((b) => (
            <Link
              key={b.name}
              to={url}
              aria-label={`Открыть счёт: ${b.name}`}
              className="group relative flex h-28 items-center justify-center border-r border-line px-4 transition-colors last:border-r-0 hover:bg-surface lg:h-32 lg:px-10"
            >
              <img
                src={b.logo}
                alt={b.name}
                loading="lazy"
                className="h-7 w-auto max-w-full object-contain grayscale opacity-70 transition-all group-hover:opacity-100 group-hover:grayscale-0 sm:h-9 lg:h-11"
              />
              <span className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform group-hover:scale-x-100 ${b.color}`} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
