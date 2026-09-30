import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RequestDialog from "@/components/site/RequestDialog";
import RequestForm from "@/components/site/RequestForm";
import { SERVICES, getService } from "@/data/services";
import NotFound from "./NotFound";

const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
};

export default function ServicePage() {
  const { slug = "" } = useParams();
  const s = getService(slug);
  const [dialog, setDialog] = useState(false);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!s) return;
    document.title = `${s.seoTitle} — ${s.price} | Меркурий`;
    setMeta("description", s.seoDesc);
  }, [s]);

  if (!s) return <NotFound />;

  const order = (t: string) => {
    setSubject(t);
    setDialog(true);
  };
  const scrollToForm = () => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header onPick={() => order(s.name)} />

      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <nav className="flex flex-wrap items-center gap-2 border-b border-line px-6 py-4 text-[14px] text-muted-foreground lg:px-9">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <a href="/#services" className="hover:text-primary">Услуги</a>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">{s.name}</span>
        </nav>

        <header className="grid border-b border-line lg:grid-cols-[1.25fr_1fr]">
          <div className="p-6 lg:border-r lg:border-line lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Услуга</span>
            <h1 className="mt-4 font-head text-[36px] font-extrabold leading-[1.04] tracking-[-0.035em] md:text-[54px]">{s.seoTitle}</h1>
            <p className="mt-5 max-w-xl text-[17px] text-muted-foreground">{s.short}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button onClick={scrollToForm} className="h-12 bg-primary px-7 font-semibold text-primary-foreground transition-colors hover:bg-ink">
                Оставить заявку
              </button>
              <a href="tel:+74951234567" className="font-semibold hover:text-primary">+7 495 123-45-67</a>
            </div>
          </div>
          <div className={`relative flex flex-col justify-end overflow-hidden p-6 text-white lg:p-12 ${s.color}`}>
            <Icon name={s.icon} size={180} className="absolute -right-6 -top-6 opacity-15" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] opacity-75">Стоимость</span>
            <p className="mt-2 font-head text-[48px] font-extrabold leading-none tracking-[-0.035em] md:text-[64px]">{s.price}</p>
            <p className="mt-2 opacity-80">{s.priceNote}</p>
          </div>
        </header>

        <div className="grid border-b border-line lg:grid-cols-[1.25fr_1fr]">
          <article className="p-6 lg:border-r lg:border-line lg:p-12">
            <h2 className="font-head text-[30px] font-extrabold tracking-[-0.03em]">Об услуге</h2>
            <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-foreground/85">
              {s.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
          <div className="bg-surface p-6 lg:p-12">
            <h2 className="font-head text-[24px] font-extrabold tracking-[-0.03em]">Что входит</h2>
            <ul className="mt-5 space-y-3">
              {s.includes.map((it) => (
                <li key={it} className="flex gap-3">
                  <Icon name="Check" size={18} className="mt-0.5 flex-none text-primary" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="border-b border-line">
          <h2 className="border-b border-line px-6 py-8 font-head text-[30px] font-extrabold tracking-[-0.03em] lg:px-12">Этапы работы</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5">
            {s.steps.map((st, i) => (
              <li key={st.title} className="border-b border-line p-6 sm:border-r lg:border-b-0 lg:p-8 lg:last:border-r-0">
                <span className="font-head text-[40px] font-extrabold leading-none text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[17px] font-bold">{st.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{st.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="grid border-b border-line lg:grid-cols-[1.25fr_1fr]">
          <section className="lg:border-r lg:border-line">
            <h2 className="border-b border-line px-6 py-8 font-head text-[30px] font-extrabold tracking-[-0.03em] lg:px-12">Цены</h2>
            <ul>
              {s.prices.map((p) => (
                <li key={p.name} className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 last:border-b-0 lg:px-12">
                  <span className="font-medium">{p.name}</span>
                  <span className="flex items-center gap-4">
                    <span className="whitespace-nowrap font-head text-[20px] font-extrabold">{p.price}</span>
                    <button
                      onClick={() => order(`${s.name}: ${p.name}`)}
                      aria-label="Заказать"
                      className="grid h-9 w-9 place-items-center bg-ink text-ink-foreground transition-colors hover:bg-primary"
                    >
                      <Icon name="ArrowUpRight" size={16} />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section className="border-t border-line bg-surface p-6 lg:border-t-0 lg:p-12">
            <h2 className="font-head text-[24px] font-extrabold tracking-[-0.03em]">Что понадобится</h2>
            <ul className="mt-5 space-y-3">
              {s.docs.map((d) => (
                <li key={d} className="flex gap-3">
                  <Icon name="FileText" size={18} className="mt-0.5 flex-none text-primary" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {s.partners && (
          <section className="border-b border-line">
            <div className="flex flex-col justify-between gap-3 border-b border-line px-6 py-8 lg:flex-row lg:items-end lg:px-12">
              <h2 className="font-head text-[30px] font-extrabold tracking-[-0.03em]">Банки-партнёры</h2>
              <p className="max-w-md text-muted-foreground">Работаем напрямую с банками — вы получаете специальные условия и сопровождение персонального менеджера.</p>
            </div>
            <div className="grid md:grid-cols-3">
              {s.partners.map((b) => (
                <div key={b.name} className="flex flex-col border-b border-line md:border-b-0 md:border-r md:last:border-r-0">
                  <div className="relative flex h-32 items-center justify-center border-b border-line bg-white px-8">
                    <img src={b.logo} alt={b.name} loading="lazy" className="h-12 w-auto max-w-full object-contain" />
                    <span className={`absolute inset-x-0 bottom-0 h-1.5 ${b.color}`} />
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-9">
                    <ul className="flex-1 space-y-3">
                      {b.perks.map((p) => (
                        <li key={p} className="flex gap-3">
                          <Icon name="Check" size={18} className="mt-0.5 flex-none text-primary" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => order(`Открытие расчётного счёта: ${b.name}`)}
                      className="mt-7 h-12 bg-ink font-semibold text-ink-foreground transition-colors hover:bg-primary"
                    >
                      Открыть счёт в {b.name === "Сбербанк" ? "Сбербанке" : b.name === "Альфа-Банк" ? "Альфа-Банке" : "Т-Банке"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section id="order" className="grid scroll-mt-24 border-b border-line bg-ink text-ink-foreground lg:grid-cols-[1.25fr_1fr]">
          <div className="p-6 lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-band-1">Заявка</span>
            <h2 className="mt-4 font-head text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[44px]">
              Заказать услугу
              <br />
              «{s.name}»
            </h2>
            <p className="mt-5 max-w-md text-ink-foreground/70">Перезвоним в течение 15 минут в рабочее время, ответим на вопросы и рассчитаем точную стоимость.</p>
          </div>
          <div className="p-6 lg:p-12">
            <RequestForm subject={s.name} dark submitLabel="Отправить заявку" />
          </div>
        </section>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.filter((x) => x.slug !== s.slug).map((x) => (
            <Link key={x.slug} to={`/services/${x.slug}`} className="group flex items-center gap-4 border-b border-line px-6 py-6 transition-colors hover:bg-surface sm:border-r lg:px-9">
              <span className="grid h-11 w-11 flex-none place-items-center bg-surface text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name={x.icon} size={20} />
              </span>
              <span>
                <span className="block font-bold group-hover:text-primary">{x.name}</span>
                <span className="text-[13.5px] text-muted-foreground">{x.price}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
      <RequestDialog open={dialog} onOpenChange={setDialog} subject={subject} />
    </div>
  );
}
