import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { SERVICES, getService } from "@/data/services";

const BANK_SLUG = "otkrytie-raschetnogo-scheta";

export default function CompactExtras() {
  const bank = getService(BANK_SLUG);
  const partners = bank?.partners ?? [];
  const services = SERVICES.filter((s) => s.slug !== BANK_SLUG);
  const bankUrl = `/services/${BANK_SLUG}`;

  return (
    <>
      <section className="border-b border-line">
        <div className="flex items-end justify-between gap-4 px-6 pt-10 lg:px-9">
          <h2 className="font-head text-[26px] font-extrabold tracking-[-0.03em]">Услуги</h2>
          <a href="/#services" className="hidden items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline sm:inline-flex">
            Все услуги и цены <Icon name="ArrowRight" size={15} />
          </a>
        </div>
        <div className="mt-6 grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="group flex flex-col gap-3 border-b border-line p-5 transition-colors hover:bg-surface sm:border-r lg:border-b-0 lg:last:border-r-0"
            >
              <span className="grid h-10 w-10 place-items-center bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name={s.icon} size={19} />
              </span>
              <span className="text-[15px] font-bold leading-snug group-hover:text-primary">{s.name}</span>
              <span className="mt-auto flex items-center justify-between gap-2">
                <span className="font-head text-[17px] font-extrabold">{s.price}</span>
                <Icon name="ArrowUpRight" size={17} className="text-muted-foreground transition-colors group-hover:text-primary" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {bank && (
        <section className="grid border-b border-line bg-surface lg:grid-cols-[1.25fr_1fr]">
          <Link to={bankUrl} className="group flex items-center gap-4 border-b border-line p-6 lg:border-b-0 lg:border-r lg:px-9">
            <span className="grid h-11 w-11 flex-none place-items-center bg-background text-primary">
              <Icon name="Landmark" size={20} />
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">Банки-партнёры</span>
              <span className="block text-[16px] font-bold leading-snug group-hover:text-primary">
                Откроем расчётный счёт бесплатно сразу после регистрации
              </span>
            </span>
            <Icon name="ArrowRight" size={18} className="ml-auto flex-none text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
          <div className="grid grid-cols-3">
            {partners.map((b) => (
              <Link
                key={b.name}
                to={bankUrl}
                aria-label={`Открыть счёт: ${b.name}`}
                className="group flex h-20 items-center justify-center border-r border-line px-4 transition-colors last:border-r-0 hover:bg-background"
              >
                <img
                  src={b.logo}
                  alt={b.name}
                  loading="lazy"
                  className="h-6 w-auto max-w-full object-contain opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0 lg:h-7"
                />
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
