import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ADDRESSES, Address, formatPrice, uniq } from "@/data/addresses";
import { useReveal } from "@/hooks/use-reveal";
import { Link } from "react-router-dom";
import YandexMap from "./YandexMap";

type Props = { onRequest: (a?: Address) => void };

const OKRUGS = ["Все", ...uniq("okrug")];

export default function MapSection({ onRequest }: Props) {
  const [okrug, setOkrug] = useState("Все");
  const [active, setActive] = useState<Address | null>(ADDRESSES[0]);
  const ref = useReveal<HTMLElement>();

  const list = okrug === "Все" ? ADDRESSES : ADDRESSES.filter((a) => a.okrug === okrug);

  return (
    <section id="map" ref={ref} className="scroll-mt-20 border-t border-line bg-surface">
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <div className="grid gap-6 border-b border-line px-6 py-14 lg:grid-cols-[420px_1fr] lg:px-0 lg:py-0">
          <div className="reveal lg:border-r lg:border-line lg:py-16 lg:pl-14">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">02 / Карта</span>
          </div>
          <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:px-14 lg:py-16">
            <h2 className="font-head text-[40px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[56px]">
              Адреса
              <br />
              на карте Москвы
            </h2>
            <p className="max-w-[340px] text-muted-foreground">Все адреса каталога на карте Яндекса. Нажмите на метку — покажем инспекцию, метро и стоимость.</p>
          </div>
        </div>

        <div className="flex gap-px overflow-x-auto border-b border-line bg-line">
          {OKRUGS.map((o) => (
            <button
              key={o}
              onClick={() => {
                setOkrug(o);
                const first = o === "Все" ? ADDRESSES[0] : ADDRESSES.find((a) => a.okrug === o);
                setActive(first ?? null);
              }}
              className={`h-12 flex-none px-5 font-semibold transition-colors ${okrug === o ? "bg-primary text-primary-foreground" : "bg-background hover:text-primary"}`}
            >
              {o}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_420px]">
          <div className="relative border-b border-line lg:border-b-0 lg:border-r">
            <YandexMap
              addresses={list}
              activeId={active?.id}
              onSelect={setActive}
              className="aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[620px]"
            />
            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 bg-background/90 px-3 py-2 text-[12px] font-medium text-muted-foreground">
              <span className="h-3 w-3 rounded-full border-2 border-white bg-primary" /> {list.length} объектов на карте
            </div>
          </div>

          <aside className="flex flex-col bg-background">
            {active ? (
              <div key={active.id} className="animate-fade-in border-b border-line p-6 lg:p-9">
                <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em]">
                  <span className="bg-primary px-2 py-0.5 text-primary-foreground">{active.okrug}</span>
                  <span className="text-muted-foreground">{active.district}</span>
                </div>
                <h3 className="mt-4 font-head text-[28px] font-extrabold leading-tight tracking-[-0.02em]">{active.street}</h3>
                <dl className="mt-5 grid grid-cols-2 gap-px bg-line text-[14px]">
                  {[
                    ["ИФНС", `№ ${active.ifns}`],
                    ["Метро", active.metro],
                    ["Объект", active.area],
                    ["Срок", active.term],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-surface p-3">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
                      <dd className="mt-1 font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <Link to={`/address/${active.id}`} className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:underline">
                  Подробнее об адресе <Icon name="ArrowRight" size={14} />
                </Link>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-head text-[30px] font-extrabold tracking-[-0.02em]">{formatPrice(active.price)} ₽</span>
                  <button onClick={() => onRequest(active)} className="h-11 bg-ink px-5 font-semibold text-ink-foreground transition-colors hover:bg-primary">
                    Заказать
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-9 text-muted-foreground">Выберите точку на карте</div>
            )}
            <ul className="max-h-[320px] flex-1 overflow-y-auto">
              {list.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() => setActive(a)}
                    className={`flex w-full items-center justify-between gap-3 border-b border-line px-6 py-3.5 text-left transition-colors lg:px-9 ${active?.id === a.id ? "bg-surface" : "hover:bg-surface"}`}
                  >
                    <span>
                      <span className="block text-[14.5px] font-semibold">{a.street}</span>
                      <span className="text-[12.5px] text-muted-foreground">
                        ИФНС № {a.ifns} · м. {a.metro}
                      </span>
                    </span>
                    <Icon name="MapPin" size={16} className={active?.id === a.id ? "text-primary" : "text-muted-foreground"} />
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
