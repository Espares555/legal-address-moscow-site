import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RequestDialog from "@/components/site/RequestDialog";
import RequestForm from "@/components/site/RequestForm";
import CompactExtras from "@/components/site/CompactExtras";
import { REVIEWS, REVIEWS_AVG, formatAvg, initials } from "@/data/reviews";
import { abs, breadcrumbs, useSeo } from "@/lib/seo";

const BANDS = ["bg-band-1", "bg-band-2", "bg-band-3", "bg-band-4"];
const fmtDate = (d: string) => new Date(d).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });

const Stars = ({ n, size = 16 }: { n: number; size?: number }) => (
  <span className="flex gap-0.5 text-primary" aria-label={`Оценка ${n} из 5`}>
    {Array.from({ length: 5 }).map((_, k) => (
      <Icon key={k} name="Star" size={size} className={k < n ? "fill-current" : "text-line"} />
    ))}
  </span>
);

export default function ReviewsPage() {
  const [dialog, setDialog] = useState(false);
  const [service, setService] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = useMemo(() => Array.from(new Set(REVIEWS.map((r) => r.service))), []);
  const list = service === "all" ? REVIEWS : REVIEWS.filter((r) => r.service === service);
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, count: REVIEWS.filter((r) => r.rating === n).length }));

  useSeo({
    title: `Отзывы клиентов о компании Меркурий — ${formatAvg(REVIEWS_AVG)} из 5 | Юридические адреса в Москве`,
    description: `${REVIEWS.length} отзывов клиентов о юридических адресах, регистрации ООО и ИП, смене адреса и почтовом обслуживании. Средняя оценка ${formatAvg(REVIEWS_AVG)} из 5.`,
    schema: [
      breadcrumbs([["Отзывы", "/reviews"]]),
      {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "@id": abs("/#organization"),
        name: "Меркурий",
        url: abs("/"),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: REVIEWS_AVG.toFixed(1),
          reviewCount: REVIEWS.length,
          bestRating: 5,
          worstRating: 1,
        },
        review: REVIEWS.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.name },
          datePublished: r.date,
          reviewBody: r.text,
          reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
        })),
      },
    ],
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header onPick={() => setDialog(true)} />
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <nav className="flex items-center gap-2 border-b border-line px-6 py-4 text-[14px] text-muted-foreground lg:px-9">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Отзывы</span>
        </nav>

        <header className="grid border-b border-line lg:grid-cols-[1.25fr_1fr]">
          <div className="p-6 lg:border-r lg:border-line lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Отзывы</span>
            <h1 className="mt-4 font-head text-[40px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[60px]">
              Что говорят
              <br />
              <span className="text-primary">наши клиенты</span>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
              Реальные отзывы предпринимателей, которые арендовали у нас юридический адрес, регистрировали компанию или меняли адрес.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-6 p-6 lg:p-12">
            <div className="flex items-end gap-4">
              <span className="font-head text-[72px] font-extrabold leading-none tracking-[-0.04em]">{formatAvg(REVIEWS_AVG)}</span>
              <div className="pb-2">
                <Stars n={5} size={18} />
                <p className="mt-1 text-[14px] text-muted-foreground">{REVIEWS.length} отзывов</p>
              </div>
            </div>
            <ul className="space-y-2">
              {dist.map((d) => (
                <li key={d.n} className="flex items-center gap-3 text-[14px]">
                  <span className="w-3 font-semibold">{d.n}</span>
                  <Icon name="Star" size={13} className="fill-current text-primary" />
                  <span className="h-2 flex-1 bg-surface">
                    <span className="block h-full bg-primary" style={{ width: `${(d.count / REVIEWS.length) * 100}%` }} />
                  </span>
                  <span className="w-5 text-right text-muted-foreground">{d.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 border-b border-line px-6 py-5 lg:px-9">
          {["all", ...services].map((s) => (
            <button
              key={s}
              onClick={() => setService(s)}
              className={`h-9 border px-4 text-[14px] font-semibold transition-colors ${service === s ? "border-primary bg-primary text-primary-foreground" : "border-line hover:border-primary hover:text-primary"}`}
            >
              {s === "all" ? "Все" : s}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <article key={r.name} className="flex flex-col border-b border-line px-6 py-8 sm:border-r lg:px-9">
              <div className="flex items-center justify-between gap-3">
                <Stars n={r.rating} />
                <time dateTime={r.date} className="text-[13px] text-muted-foreground">{fmtDate(r.date)}</time>
              </div>
              <span className="mt-4 inline-flex w-fit bg-surface px-2.5 py-1 text-[12px] font-semibold text-primary">{r.service}</span>
              <p className="mt-4 flex-1 text-[15.5px] leading-relaxed text-foreground/85">«{r.text}»</p>
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

        <section className="grid border-b border-line bg-ink text-ink-foreground lg:grid-cols-[1.25fr_1fr]">
          <div className="p-6 lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-band-1">Станьте следующим</span>
            <h2 className="mt-4 font-head text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[44px]">
              Подберём адрес
              <br />
              за 15 минут
            </h2>
            <p className="mt-5 max-w-md text-ink-foreground/70">Оставьте телефон — менеджер перезвонит и пришлёт подходящие варианты.</p>
          </div>
          <div className="p-6 lg:p-12">
            <RequestForm subject="Заявка со страницы «Отзывы»" dark submitLabel="Отправить заявку" />
          </div>
        </section>

        <CompactExtras />
      </div>
      <Footer />
      <RequestDialog open={dialog} onOpenChange={setDialog} subject="" />
    </div>
  );
}
