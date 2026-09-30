import { useEffect, useRef, useState } from "react";
import { Address, formatPrice } from "@/data/addresses";

declare global {
  interface Window {
    ymaps?: any;
  }
}

let loader: Promise<any> | null = null;

const loadYmaps = () => {
  if (window.ymaps?.Map) return Promise.resolve(window.ymaps);
  if (!loader) {
    loader = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      s.async = true;
      s.onload = () => window.ymaps.ready(() => resolve(window.ymaps));
      s.onerror = () => {
        loader = null;
        reject(new Error("ymaps"));
      };
      document.head.appendChild(s);
    });
  }
  return loader;
};

type Props = {
  addresses: Address[];
  activeId?: number | null;
  onSelect?: (a: Address) => void;
  zoom?: number;
  className?: string;
};

const PRIMARY = "#6a3fe0";
const INK = "#141414";

export default function YandexMap({ addresses, activeId, onSelect, zoom, className }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const placemarks = useRef<Map<number, any>>(new Map());
  const [error, setError] = useState(false);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    let dead = false;
    loadYmaps()
      .then((ymaps) => {
        if (dead || !box.current) return;
        map.current = new ymaps.Map(
          box.current,
          { center: [55.7522, 37.6156], zoom: zoom ?? 10, controls: ["zoomControl", "fullscreenControl"] },
          { suppressMapOpenBlock: true },
        );
        map.current.behaviors.disable("scrollZoom");
        draw();
      })
      .catch(() => !dead && setError(true));
    return () => {
      dead = true;
      map.current?.destroy();
      map.current = null;
      placemarks.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draw = () => {
    const ymaps = window.ymaps;
    if (!map.current || !ymaps) return;
    map.current.geoObjects.removeAll();
    placemarks.current.clear();
    addresses.forEach((a) => {
      const pm = new ymaps.Placemark(
        [a.lat, a.lng],
        {
          hintContent: `${a.street} — ${formatPrice(a.price)} ₽`,
          balloonContentHeader: a.street,
          balloonContentBody: `ИФНС № ${a.ifns} · м. ${a.metro}<br/><b>${formatPrice(a.price)} ₽</b> / ${a.term}`,
          balloonContentFooter: `<a href="/address/${a.id}" style="color:${PRIMARY};font-weight:600">Подробнее об адресе →</a>`,
        },
        { preset: "islands#circleDotIcon", iconColor: a.id === activeId ? INK : PRIMARY },
      );
      pm.events.add("click", () => onSelectRef.current?.(a));
      map.current.geoObjects.add(pm);
      placemarks.current.set(a.id, pm);
    });
    if (addresses.length > 1) {
      map.current.setBounds(map.current.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 40 });
    } else if (addresses.length === 1) {
      map.current.setCenter([addresses[0].lat, addresses[0].lng], zoom ?? 15);
    }
  };

  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  useEffect(() => {
    placemarks.current.forEach((pm, id) => pm.options.set("iconColor", id === activeId ? INK : PRIMARY));
    const a = addresses.find((x) => x.id === activeId);
    if (a && map.current && addresses.length > 1) map.current.panTo([a.lat, a.lng], { duration: 400 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  return (
    <div className={`relative ${className ?? ""}`}>
      <div ref={box} className="absolute inset-0" />
      {error && (
        <div className="absolute inset-0 grid place-items-center bg-surface p-6 text-center text-muted-foreground">
          Не удалось загрузить карту. Обновите страницу.
        </div>
      )}
    </div>
  );
}
