type Props = {
  title: string;
  values: string[];
  current: string;
  onChange: (v: string) => void;
  fmt?: (v: string) => string;
};

export default function ChipGroup({ title, values, current, onChange, fmt }: Props) {
  return (
    <div>
      <h3 className="mb-3 text-[19px] font-semibold tracking-[-0.01em]">{title}</h3>
      <div className="flex flex-wrap gap-x-2.5 gap-y-2.5">
        <button
          onClick={() => onChange("all")}
          className={`h-7 rounded-md px-3 text-[13px] font-semibold uppercase transition-colors ${
            current === "all" ? "bg-primary text-primary-foreground" : "bg-line/80 text-foreground hover:bg-primary/15 hover:text-primary"
          }`}
        >
          Все
        </button>
        {values.map((v) => {
          const on = current === v;
          return (
            <button
              key={v}
              onClick={() => onChange(on ? "all" : v)}
              className={`h-7 rounded-md px-3 text-[13px] font-semibold uppercase transition-colors ${
                on ? "bg-primary text-primary-foreground" : "bg-line/80 text-foreground hover:bg-primary/15 hover:text-primary"
              }`}
            >
              {fmt ? fmt(v) : v}
            </button>
          );
        })}
      </div>
    </div>
  );
}
