import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ADDRESSES, Filters, applyFilters, formatPrice, plural } from "@/data/addresses";

type Props = {
  onSearch: (f: Partial<Filters>) => void;
  onOpenMap: () => void;
};

const HERO_FILTER: Filters = { query: "", ifns: "all", okrug: "ЦАО", district: "Тверской", metro: "all" };

const BANDS = [
  { label: "ИФНС", value: "№ 10", color: "bg-band-1", key: "ifns", v: "10" },
  { label: "Округ", value: "ЦАО", color: "bg-band-2", key: "okrug", v: "ЦАО" },
  { label: "Район", value: "Тверской", color: "bg-band-3", key: "district", v: "Тверской" },
  { label: "Метро", value: "Пушкинская", color: "bg-band-4", key: "metro", v: "Пушкинская" },
] as const;

export default function Hero({ onSearch, onOpenMap }: Props) {
  const [q, setQ] = useState("");
  const found = applyFilters(ADDRESSES, HERO_FILTER);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    onSearch({ query: q });
  };

  return (
    <main
      id="top"
      className="mx-3 border border-b-0 border-line bg-surface lg:mx-[18px] lg:grid lg:min-h-[calc(100vh-112px)] lg:grid-cols-[420px_1fr] lg:grid-rows-[300px_208px_1fr]"
    >
      {/* lead */}
      <div className="border-line px-6 pt-8 lg:border-r lg:pl-14 lg:pr-0 lg:pt-[58px]">
        <p className="text-[20px] leading-[1.35] tracking-[-0.01em] text-muted-foreground lg:text-[24px]">
          <b className="font-bold text-foreground/80">Ищите</b> по ИФНС и округу
          <br />
          <b className="font-bold text-foreground/80">Ищите</b> по району и метро
        </p>
      </div>

      {/* head */}
      <div className="flex flex-col gap-5 px-6 pb-8 pt-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:pb-[26px] lg:pl-14 lg:pr-[60px] lg:pt-9">
        <h1 className="font-head text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[60px] xl:text-[72px]">
          <span className="mb-1.5 block text-[0.54em] leading-[1.08] tracking-[-0.02em]">
            Меркурий —<br />
            база юридических
          </span>
          адресов
          <br />
          Москвы
        </h1>
        <p className="max-w-[300px] pb-2.5 text-[14.5px] leading-[1.6] text-muted-foreground">
          Адреса для регистрации и смены юрадреса. Задайте параметры — покажем объекты списком и на карте.
        </p>
      </div>

      {/* lines */}
      <div className="relative hidden lg:col-start-1 lg:row-start-2 lg:block" aria-hidden="true">
        <div className="anim-wipe absolute bottom-0 left-0 h-[308px] w-[420px]">
        <svg
          viewBox="0 0 420 308"
          preserveAspectRatio="none"
          className="block h-full w-full"
          fill="none"
          strokeWidth={52}
          strokeLinejoin="round"
        >
          <path className="stroke-band-2" d="M-10 178 H430" />
          <path className="stroke-band-4" d="M-10 26 H130 L320 282 H430" />
          <path className="stroke-band-3" d="M-10 104 H50 L210 230 H430" />
          <path className="stroke-band-1" d="M-10 290 H70 L280 126 H430" />
          <circle className="fill-white" cx="112" cy="26" r="15" />
          <circle className="fill-white" cx="30" cy="104" r="8" />
          <circle className="fill-white" cx="150" cy="178" r="17" />
          <circle className="fill-white" cx="240" cy="157" r="8" />
        </svg>
        </div>
      </div>

      {/* bands */}
      <div className="relative lg:col-start-2 lg:row-start-2">
        <div className="anim-wipe-delay relative grid grid-rows-[repeat(4,52px)]">
          <span className="absolute bottom-[26px] left-[33px] top-[26px] z-[1] w-[3px] bg-white lg:left-[65px]" aria-hidden="true" />
          {BANDS.map((b, i) => (
            <button
              key={b.label}
              onClick={() => onSearch({ [b.key]: b.v } as Partial<Filters>)}
              className={`group relative flex items-center gap-5 pl-6 text-left font-bold text-white lg:pl-14 ${b.color} ${i === 3 ? "rounded-bl-[14px]" : ""}`}
            >
              <span className={`relative z-[2] h-5 w-5 flex-none rounded-full border-[3px] border-white ${b.color} transition-transform group-hover:scale-125`} />
              <small className="w-[58px] text-[15px] font-medium opacity-75">{b.label}</small>
              <span className="transition-transform group-hover:translate-x-1">{b.value}</span>
            </button>
          ))}
        </div>

        <form
          onSubmit={submit}
          className="anim-rise relative bg-card px-6 py-6 lg:absolute lg:bottom-0 lg:right-8 lg:top-[52px] lg:w-[390px] lg:px-9 lg:pb-0 lg:pt-[30px]"
        >
          <label className="flex h-[42px] items-center gap-2 border border-line bg-surface px-[18px] text-muted-foreground focus-within:border-primary">
            <Icon name="Search" size={15} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Улица, ИФНС или станция метро"
              className="h-full w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <div className="mt-4 flex items-center gap-[22px]">
            <button type="submit" className="inline-flex h-10 items-center bg-ink px-5 font-semibold text-ink-foreground transition-colors hover:bg-primary">
              Найти адрес
            </button>
            <button type="button" onClick={onOpenMap} className="inline-flex items-center gap-[7px] font-semibold text-foreground hover:text-primary">
              <Icon name="MapPin" size={15} className="text-primary" />
              На карте
            </button>
          </div>
        </form>
      </div>

      {/* catalog preview */}
      <section className="grid grid-rows-[auto_1fr] border-t border-line bg-background lg:col-span-2 lg:row-start-3 lg:grid-rows-[50px_1fr]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-6 py-3 text-[14.5px] text-muted-foreground lg:px-9 lg:py-0">
          <span>
            По фильтру найдено{" "}
            <b className="font-semibold text-foreground">
              {found.length} {plural(found.length, ["адрес", "адреса", "адресов"])}
            </b>{" "}
            · ЦАО, Тверской
          </span>
          <button
            onClick={() => onSearch({})}
            className="inline-flex items-center gap-[7px] font-semibold text-foreground hover:text-primary"
          >
            Вся база →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {found.slice(0, 4).map((a) => (
            <button
              key={a.id}
              onClick={() => onSearch({ query: a.street })}
              className="group flex flex-col gap-1.5 border-b border-line px-6 py-5 text-left transition-colors hover:bg-surface sm:border-r lg:border-b-0 lg:px-9 lg:pb-6 lg:pt-[22px] lg:last:border-r-0"
            >
              <h3 className="text-[16px] font-bold tracking-[-0.01em] group-hover:text-primary">{a.street}</h3>
              <span className="text-[13.5px] text-muted-foreground">
                ИФНС № {a.ifns} · м. {a.metro}
              </span>
              <span className="mt-2.5 font-head text-[22px] font-extrabold tracking-[-0.02em]">
                {formatPrice(a.price)} ₽{" "}
                <span className="font-body text-[12px] font-medium tracking-normal text-muted-foreground">/ {a.term}</span>
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
