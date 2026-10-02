import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/use-reveal";
import { REVIEWS, REVIEWS_AVG, formatAvg, initials } from "@/data/reviews";



const BANDS = ["bg-band-1", "bg-band-2", "bg-band-3", "bg-band-4"];

export default function Reviews() {
  const ref = useReveal<HTMLElement>();
  const avg = formatAvg(REVIEWS_AVG);

  return (
    <section id="reviews" ref={ref} className="scroll-mt-20 border-t border-line bg-background">
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <div className="grid gap-6 border-b border-line px-6 py-14 lg:grid-cols-[420px_1fr] lg:px-0 lg:py-0">
          <div className="reveal lg:border-r lg:border-line lg:py-16 lg:pl-14">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">04 / Отзывы</span>
          </div>
          <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:px-14 lg:py-16">
            <h2 className="font-head text-[40px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[56px]">
              Что говорят
              <br />
              <span className="text-primary">клиенты</span>
            </h2>
            <div className="flex items-end gap-4">
              <span className="font-head text-[56px] font-extrabold leading-none tracking-[-0.03em]">{avg}</span>
              <div className="pb-1.5">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-current" />
                  ))}
                </div>
                <p className="mt-1 text-[13.5px] text-muted-foreground">средняя оценка клиентов</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.slice(0, 6).map((r, i) => (
            <article key={r.name} className="reveal flex flex-col border-b border-line px-6 py-8 sm:border-r lg:px-9">
              <div className="flex gap-0.5 text-primary" aria-label={`Оценка ${r.rating} из 5`}>
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon key={k} name="Star" size={16} className={k < r.rating ? "fill-current" : "text-line"} />
                ))}
              </div>
              <p className="mt-5 flex-1 text-[15.5px] leading-relaxed text-foreground/85">«{r.text}»</p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className={`grid h-11 w-11 flex-none place-items-center rounded-full font-bold text-white ${BANDS[i % 4]}`}>{initials(r.name)}</span>
                <span>
                  <span className="block font-bold">{r.name}</span>
                  <span className="text-[13.5px] text-muted-foreground">{r.company}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
        <Link
          to="/reviews"
          className="group flex items-center justify-center gap-2 border-b border-line py-6 font-semibold text-primary transition-colors hover:bg-surface"
        >
          Все отзывы ({REVIEWS.length})
          <Icon name="ArrowRight" size={17} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
