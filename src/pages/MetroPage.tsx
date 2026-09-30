import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RequestDialog from "@/components/site/RequestDialog";
import RequestForm from "@/components/site/RequestForm";
import YandexMap from "@/components/site/YandexMap";
import { Address, formatPrice, getPhoto, plural } from "@/data/addresses";
import { METRO_LIST, getMetroBySlug, getMetroDescription, metroSlug } from "@/data/metro";
import { okrugSlug } from "@/data/okrugs";
import { addressListSchema, breadcrumbs, useSeo } from "@/lib/seo";
import NotFound from "./NotFound";


export default function MetroPage() {
  const { slug = "" } = useParams();
  const o = getMetroBySlug(slug);
  const [dialog, setDialog] = useState(false);
  const [subject, setSubject] = useState("");
  const [active, setActive] = useState<Address | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (o) setActive(o.addresses[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useSeo(
    o
      ? {
          title: `Юридический адрес у метро ${o.name} — от ${formatPrice(o.minPrice)} ₽ | Меркурий`,
          description: `Юридические адреса рядом с метро «${o.name}» (${o.districts.join(", ")}, ${o.okrugs.join(", ")}): ${o.addresses.length} ${plural(o.addresses.length, ["адрес", "адреса", "адресов"])} от ${formatPrice(o.minPrice)} ₽. Карта, ИФНС, цены.`,
          image: getPhoto(o.addresses[0]),
          schema: [breadcrumbs([["База адресов", "/#catalog"], [`м. ${o.name}`, `/metro/${o.slug}`]]), addressListSchema(`Юридические адреса у метро ${o.name}`, o.addresses)],
        }
      : { title: "Страница не найдена | Меркурий", description: "Страница не найдена", noindex: true },
  );

  if (!o) return <NotFound />;

  const order = (s: string) => {
    setSubject(s);
    setDialog(true);
  };

  const facts: [string, string, string][] = [
    ["TrainFront", "Станция", o.name],
    ["MapPinned", "Район", `${o.districts.join(", ")}, ${o.okrugs.join(", ")}`],
    ["Landmark", "Инспекции", o.ifns.map((n) => `№ ${n}`).join(", ")],
    ["Wallet", "Цена от", `${formatPrice(o.minPrice)} ₽`],
  ];

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header onPick={() => order(`Нужен адрес у метро ${o.name}`)} />

      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <nav className="flex flex-wrap items-center gap-2 border-b border-line px-6 py-4 text-[14px] text-muted-foreground lg:px-9">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <a href="/#catalog" className="hover:text-primary">База адресов</a>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">м. {o.name}</span>
        </nav>

        <header className="grid border-b border-line lg:grid-cols-[1.25fr_1fr]">
          <div className="p-6 lg:border-r lg:border-line lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Станция метро</span>
            <h1 className="mt-4 font-head text-[38px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[60px]">
              Юридический адрес
              <br />
              <span className="text-primary">у метро {o.name}</span>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] text-muted-foreground">
              {o.addresses.length} {plural(o.addresses.length, ["проверенный адрес", "проверенных адреса", "проверенных адресов"])} рядом со станцией «{o.name}» для регистрации
              и смены юрадреса — от {formatPrice(o.minPrice)} ₽.
            </p>
          </div>
          <div className="grid grid-rows-4" aria-hidden="true">
            <div className="min-h-6 bg-band-1" />
            <div className="min-h-6 bg-band-2" />
            <div className="min-h-6 bg-band-3" />
            <div className="min-h-6 bg-band-4" />
          </div>
        </header>

        <dl className="grid grid-cols-2 gap-px border-b border-line bg-line lg:grid-cols-4">
          {facts.map(([icon, k, v]) => (
            <div key={k} className="bg-background p-6">
              <Icon name={icon} size={20} className="text-primary" />
              <dt className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
              <dd className="mt-1 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="grid border-b border-line lg:grid-cols-[1fr_420px]">
          <YandexMap
            addresses={o.addresses}
            activeId={active?.id}
            onSelect={setActive}
            zoom={13}
            className="h-[380px] border-b border-line lg:h-full lg:min-h-[460px] lg:border-b-0 lg:border-r"
          />
          <div>
            <h2 className="border-b border-line px-6 py-5 font-head text-[22px] font-extrabold tracking-[-0.02em] lg:px-9">
              Адреса рядом с метро
            </h2>
            <ul>
              {o.addresses.map((a) => (
                <li key={a.id} className={`flex gap-4 border-b border-line px-6 py-4 transition-colors lg:px-9 ${active?.id === a.id ? "bg-surface" : ""}`}>
                  <img src={getPhoto(a)} alt={a.street} loading="lazy" className="h-16 w-20 flex-none object-cover" />
                  <div className="min-w-0 flex-1">
                    <Link to={`/address/${a.id}`} className="block font-bold hover:text-primary">
                      {a.street}
                    </Link>
                    <p className="text-[13px] text-muted-foreground">
                      ИФНС № {a.ifns} · м. {a.metro}{o.own.includes(a) ? "" : " · рядом"}
                    </p>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="font-head text-[18px] font-extrabold">{formatPrice(a.price)} ₽</span>
                      <button
                        onClick={() => order(`Интересует адрес: ${a.street} (ИФНС № ${a.ifns}, ${a.okrug})`)}
                        className="h-8 bg-ink px-3 text-[13px] font-semibold text-ink-foreground transition-colors hover:bg-primary"
                      >
                        Заказать
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid border-b border-line lg:grid-cols-[1.25fr_1fr]">
          <article className="p-6 lg:border-r lg:border-line lg:p-12">
            <h2 className="font-head text-[30px] font-extrabold tracking-[-0.03em]">О станции {o.name}</h2>
            <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-foreground/85">
              {getMetroDescription(o).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {o.okrugs.map((n) => (
                <Link key={n} to={`/okrug/${okrugSlug(n)}`} className="inline-flex h-7 items-center rounded-md bg-primary/10 px-3 text-[13px] font-semibold uppercase text-primary hover:bg-primary hover:text-primary-foreground">
                  {n}
                </Link>
              ))}
              {o.ifns.map((n) => (
                <Link key={n} to={`/ifns/${n}`} className="inline-flex h-7 items-center rounded-md bg-primary/10 px-3 text-[13px] font-semibold uppercase text-primary hover:bg-primary hover:text-primary-foreground">
                  ИФНС {n}
                </Link>
              ))}
            </div>
          </article>
          <div className="bg-surface p-6 lg:p-12">
            <h2 className="font-head text-[26px] font-extrabold tracking-[-0.03em]">Подобрать адрес у метро {o.name}</h2>
            <p className="mb-6 mt-2 text-muted-foreground">Перезвоним и предложим свободные адреса рядом с этой станцией.</p>
            <RequestForm subject={`Нужен адрес у метро ${o.name}`} />
          </div>
        </div>

        <div className="border-b border-line px-6 py-10 lg:px-9">
          <h2 className="mb-4 text-[19px] font-semibold">Другие станции метро</h2>
          <div className="flex flex-wrap gap-2.5">
            {METRO_LIST.filter((n) => n !== o.name).map((n) => (
              <Link
                key={n}
                to={`/metro/${metroSlug(n)}`}
                className="inline-flex h-7 items-center rounded-md bg-line/80 px-3 text-[13px] font-semibold uppercase transition-colors hover:bg-primary/15 hover:text-primary"
              >
                м. {n}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <RequestDialog open={dialog} onOpenChange={setDialog} subject={subject} />
    </div>
  );
}
