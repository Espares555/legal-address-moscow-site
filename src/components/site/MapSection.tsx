import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ADDRESSES, Address, formatPrice } from "@/data/addresses";
import { useReveal } from "@/hooks/use-reveal";

type Props = { onRequest: (a?: Address) => void };

const OKRUGS = ["Все", "ЦАО", "САО", "СВАО", "ВАО", "ЮВАО", "ЮАО", "ЮЗАО", "ЗАО", "СЗАО"];

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
            <p className="max-w-[340px] text-muted-foreground">Выберите округ и нажмите на точку — покажем инспекцию, метро и стоимость.</p>
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
          <div className="relative aspect-square overflow-hidden border-b border-line bg-background sm:aspect-[4/3] lg:aspect-auto lg:min-h-[620px] lg:border-b-0 lg:border-r">
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
                  <path d="M5 0H0V5" fill="none" className="stroke-line" strokeWidth="0.15" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
              <ellipse cx="50" cy="48" rx="40" ry="38" fill="none" className="stroke-band-1" strokeWidth="2.2" opacity="0.5" />
              <ellipse cx="50" cy="48" rx="21" ry="19" fill="none" className="stroke-band-2" strokeWidth="1.6" opacity="0.6" />
              <ellipse cx="51" cy="48" rx="9" ry="8" fill="none" className="stroke-band-4" strokeWidth="1.2" opacity="0.7" />
              <path
                d="M8 40 C 20 42, 28 52, 36 50 S 44 40, 50 50 S 58 60, 64 58 S 74 64, 80 72 S 90 76, 96 74"
                fill="none"
                className="stroke-band-1"
                strokeWidth="1.6"
                opacity="0.35"
              />
              <text x="50" y="12" textAnchor="middle" className="fill-muted-foreground" fontSize="2.4" fontWeight="600" letterSpacing="0.3">
                МКАД
              </text>
              <text x="50" y="31" textAnchor="middle" className="fill-muted-foreground" fontSize="2" fontWeight="600">
                ТТК
              </text>
            </svg>

            {list.map((a) => {
              const on = active?.id === a.id;
              return (
                <button
                  key={a.id}
                  onClick={() => setActive(a)}
                  style={{ left: `${a.x}%`, top: `${a.y}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  aria-label={a.street}
                >
                  {on && <span className="absolute inset-0 rounded-full bg-primary" style={{ animation: "pin-pulse 1.6s ease-out infinite" }} />}
                  <span
                    className={`relative grid place-items-center rounded-full border-[3px] border-white transition-all ${on ? "h-7 w-7 bg-band-4" : "h-5 w-5 bg-primary group-hover:scale-125"}`}
                  />
                  <span className="pointer-events-none absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap bg-ink px-2 py-1 text-[11px] font-semibold text-ink-foreground group-hover:block">
                    {formatPrice(a.price)} ₽
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-background/90 px-3 py-2 text-[12px] font-medium text-muted-foreground">
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
