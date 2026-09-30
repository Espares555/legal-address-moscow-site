import { ADDRESSES, Address } from "./addresses";

const TR: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

export const metroSlug = (name: string) =>
  name
    .toLowerCase()
    .split("")
    .map((c) => (c in TR ? TR[c] : /[a-z0-9]/.test(c) ? c : "-"))
    .join("")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const METRO_LIST = Array.from(new Set(ADDRESSES.map((a) => a.metro))).sort((a, b) => a.localeCompare(b, "ru"));

const dist = (a: Address, b: Address) => Math.hypot((a.lat - b.lat) * 111, (a.lng - b.lng) * 63);

export type Metro = {
  name: string;
  slug: string;
  own: Address[];
  near: Address[];
  addresses: Address[];
  okrugs: string[];
  districts: string[];
  ifns: string[];
  minPrice: number;
};

export const getMetroBySlug = (slug: string): Metro | undefined => {
  const name = METRO_LIST.find((m) => metroSlug(m) === slug);
  if (!name) return undefined;
  const own = ADDRESSES.filter((a) => a.metro === name);
  const near = ADDRESSES.filter((a) => a.metro !== name)
    .map((a) => ({ a, d: Math.min(...own.map((o) => dist(o, a))) }))
    .filter((x) => x.d < 3)
    .sort((x, y) => x.d - y.d)
    .slice(0, 6)
    .map((x) => x.a);
  const addresses = [...own, ...near];
  const u = (list: Address[], k: keyof Address) => Array.from(new Set(list.map((a) => String(a[k]))));
  return {
    name,
    slug,
    own,
    near,
    addresses,
    okrugs: u(own, "okrug"),
    districts: u(own, "district"),
    ifns: u(addresses, "ifns").sort((a, b) => Number(a) - Number(b)),
    minPrice: Math.min(...addresses.map((a) => a.price)),
  };
};

export const getMetroDescription = (m: Metro) => [
  `Станция метро «${m.name}» находится в районе ${m.districts.join(", ")} (${m.okrugs.join(", ")}). Юридический адрес рядом с метро удобен для встреч с партнёрами, получения почты и визитов налоговой — до объекта можно дойти пешком за несколько минут.`,
  `Рядом со станцией в нашей базе ${m.addresses.length} ${m.addresses.length === 1 ? "адрес" : m.addresses.length < 5 ? "адреса" : "адресов"} от ${m.minPrice.toLocaleString("ru-RU")} ₽. Компании по этим адресам встают на учёт в ${m.ifns.length > 1 ? "инспекции" : "инспекцию"} ${m.ifns.map((n) => `ИФНС № ${n}`).join(", ")}.`,
  `Все адреса проверены: собственник подтверждает аренду при проверке ФНС, количество компаний на адресе ограничено, документы выдаём в день обращения.`,
];
