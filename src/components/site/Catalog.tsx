import { useMemo, useState } from "react";
import Icon from "@/components/ui/icon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { ADDRESSES, Address, EMPTY_FILTERS, Filters, applyFilters, formatPrice, getPhoto, plural, uniq } from "@/data/addresses";
import ChipGroup from "./ChipGroup";
import { useReveal } from "@/hooks/use-reveal";

type Props = {
  filters: Filters;
  setFilters: (f: Filters) => void;
  onRequest: (a?: Address) => void;
};

type Sort = "price-asc" | "price-desc" | "ifns";

const FIELDS: { key: keyof Omit<Filters, "query">; label: string; all: string; fmt?: (v: string) => string }[] = [
  { key: "district", label: "Район", all: "Все районы" },
  { key: "metro", label: "Метро", all: "Все станции", fmt: (v) => `м. ${v}` },
];

export default function Catalog({ filters, setFilters, onRequest }: Props) {
  const [sort, setSort] = useState<Sort>("price-asc");
  const ref = useReveal<HTMLElement>();

  const list = useMemo(() => {
    const r = applyFilters(ADDRESSES, filters);
    return [...r].sort((a, b) =>
      sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : Number(a.ifns) - Number(b.ifns),
    );
  }, [filters, sort]);

  const active = Object.entries(filters).filter(([k, v]) => (k === "query" ? v : v !== "all")).length;

  return (
    <section id="catalog" ref={ref} className="scroll-mt-20 border-t border-line bg-background">
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <div className="grid gap-6 border-b border-line px-6 py-14 lg:grid-cols-[420px_1fr] lg:px-0 lg:py-0">
          <div className="reveal lg:border-r lg:border-line lg:py-16 lg:pl-14">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">01 / Каталог</span>
          </div>
          <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:px-14 lg:py-16">
            <h2 className="font-head text-[40px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[56px]">
              База адресов
              <br />
              <span className="text-primary">с фильтрами</span>
            </h2>
            <p className="max-w-[340px] text-muted-foreground">
              {ADDRESSES.length} проверенных объектов. Собственник подтверждает адрес, ФНС принимает документы с первого раза.
            </p>
          </div>
        </div>

        <div className="space-y-7 border-b border-line bg-surface px-6 py-8 lg:px-9">
          <ChipGroup
            title="Выбор по ИФНС"
            values={uniq("ifns")}
            current={filters.ifns}
            fmt={(v) => `ИФНС ${v}`}
            onChange={(v) => setFilters({ ...filters, ifns: v })}
          />
          <ChipGroup
            title="Выбор по округам"
            values={uniq("okrug")}
            current={filters.okrug}
            onChange={(v) => setFilters({ ...filters, okrug: v })}
          />
        </div>

        {/* filters */}
        <div className="grid gap-px border-b border-line bg-line sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(2,1fr)_auto]">
          <label className="flex h-16 items-center gap-3 bg-surface px-6">
            <Icon name="Search" size={18} className="text-muted-foreground" />
            <input
              value={filters.query}
              onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              placeholder="Улица, ИФНС или метро"
              className="h-full w-full bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </label>
          {FIELDS.map((f) => (
            <div key={f.key} className="flex h-16 flex-col justify-center bg-surface px-4">
              <span className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{f.label}</span>
              <Select value={filters[f.key]} onValueChange={(v) => setFilters({ ...filters, [f.key]: v })}>
                <SelectTrigger className="h-8 border-0 bg-transparent font-semibold shadow-none focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{f.all}</SelectItem>
                  {uniq(f.key).map((v) => (
                    <SelectItem key={v} value={v}>
                      {f.fmt ? f.fmt(v) : v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <button
            onClick={() => setFilters(EMPTY_FILTERS)}
            disabled={!active}
            className="flex h-16 items-center justify-center gap-2 bg-surface px-6 font-semibold transition-colors hover:text-primary disabled:opacity-40 sm:col-span-2 lg:col-span-1"
          >
            <Icon name="RotateCcw" size={16} />
            Сбросить
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4 text-[14.5px] text-muted-foreground lg:px-9">
          <span>
            Найдено{" "}
            <b className="font-semibold text-foreground">
              {list.length} {plural(list.length, ["адрес", "адреса", "адресов"])}
            </b>
          </span>
          <div className="flex items-center gap-1">
            {(
              [
                ["price-asc", "Дешевле"],
                ["price-desc", "Дороже"],
                ["ifns", "По ИФНС"],
              ] as [Sort, string][]
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setSort(k)}
                className={`h-8 px-3 font-medium transition-colors ${sort === k ? "bg-ink text-ink-foreground" : "hover:text-foreground"}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <div className="flex flex-col items-center gap-4 px-6 py-20 text-center">
            <Icon name="SearchX" size={40} className="text-primary" />
            <p className="font-head text-2xl font-bold">Под такие параметры адресов нет</p>
            <p className="max-w-md text-muted-foreground">Оставьте заявку — подберём адрес вручную в нужной инспекции, часто объекты появляются раньше, чем попадают в базу.</p>
            <button onClick={() => onRequest()} className="mt-2 h-11 rounded-sm bg-primary px-6 font-semibold text-primary-foreground">
              Подобрать вручную
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {list.map((a) => (
              <article
                key={a.id}
                className="group relative flex flex-col gap-2 border-b border-line px-6 py-7 transition-colors hover:bg-surface sm:border-r lg:px-9"
              >
                <Link to={`/address/${a.id}`} className="-mx-6 -mt-7 mb-3 block aspect-[16/10] overflow-hidden lg:-mx-9">
                  <img src={getPhoto(a)} alt={a.street} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </Link>
                <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em]">
                  <span className="bg-primary px-2 py-0.5 text-primary-foreground">{a.okrug}</span>
                  <span className="text-muted-foreground">{a.district}</span>
                </div>
                <h3 className="mt-2 text-[18px] font-bold leading-snug tracking-[-0.01em]">
                  <Link to={`/address/${a.id}`} className="transition-colors hover:text-primary">
                    {a.street}
                  </Link>
                </h3>
                <p className="text-[13.5px] text-muted-foreground">
                  ИФНС № {a.ifns} · м. {a.metro}
                </p>
                <p className="text-[13.5px] text-muted-foreground">{a.area}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {a.tags.map((t) => (
                    <span key={t} className="border border-line bg-background px-2 py-0.5 text-[12px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between pt-5">
                  <span className="font-head text-[24px] font-extrabold tracking-[-0.02em]">
                    {formatPrice(a.price)} ₽{" "}
                    <span className="font-body text-[12px] font-medium tracking-normal text-muted-foreground">/ {a.term}</span>
                  </span>
                  <button
                    onClick={() => onRequest(a)}
                    aria-label="Заказать адрес"
                    className="grid h-10 w-10 place-items-center bg-ink text-ink-foreground transition-colors group-hover:bg-primary"
                  >
                    <Icon name="ArrowUpRight" size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
