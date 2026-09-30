import { useNavigate } from "react-router-dom";
import { ADDRESSES } from "@/data/addresses";
import { useReveal } from "@/hooks/use-reveal";
import YandexMap from "./YandexMap";

export default function MapSection() {
  const navigate = useNavigate();
  const ref = useReveal<HTMLElement>();

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
            <p className="max-w-[340px] text-muted-foreground">Все адреса каталога на карте Яндекса. Нажмите на метку — откроется карточка объекта с ценой и фото.</p>
          </div>
        </div>
      </div>

      <div className="relative">
          <YandexMap
            addresses={ADDRESSES}
            noBalloon
            onSelect={(a) => navigate(`/address/${a.id}`)}
            className="h-[480px] sm:h-[560px] lg:h-[680px]"
          />
          <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 bg-background/90 px-3 py-2 text-[12px] font-medium text-muted-foreground">
            <span className="h-3 w-3 rounded-full border-2 border-white bg-primary" /> {ADDRESSES.length} объектов на карте · нажмите на метку, чтобы открыть адрес
          </div>
      </div>
    </section>
  );
}
