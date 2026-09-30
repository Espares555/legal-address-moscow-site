import { ADDRESSES, Address } from "./addresses";

type OkrugInfo = { slug: string; full: string; prep: string; about: string };

export const OKRUG_INFO: Record<string, OkrugInfo> = {
  ЦАО: { slug: "cao", full: "Центральный административный округ", prep: "в ЦАО", about: "Исторический и деловой центр Москвы: Кремль, Москва-Сити, Садовое кольцо. Адрес в ЦАО — самый статусный вариант для компании: его хорошо воспринимают партнёры, банки и крупные заказчики." },
  САО: { slug: "sao", full: "Северный административный округ", prep: "в САО", about: "Округ вдоль Ленинградского и Дмитровского шоссе с крупными бизнес-центрами у метро «Динамо», «Аэропорт» и «Петровско-Разумовская». Удобная транспортная доступность и цены ниже центра." },
  СВАО: { slug: "svao", full: "Северо-Восточный административный округ", prep: "в СВАО", about: "Округ вокруг проспекта Мира и ВДНХ с развитыми бизнес-парками. Хороший баланс стоимости и репутации адреса для малого и среднего бизнеса." },
  ВАО: { slug: "vao", full: "Восточный административный округ", prep: "в ВАО", about: "Промышленный и креативный восток Москвы: лофт-кварталы, технопарки и бывшие заводы, превращённые в офисные пространства. Одни из самых доступных адресов в городе." },
  ЮВАО: { slug: "yuvao", full: "Юго-Восточный административный округ", prep: "в ЮВАО", about: "Округ вдоль Волгоградского проспекта с технопарками и складской инфраструктурой. Подходит производственным, логистическим и торговым компаниям." },
  ЮАО: { slug: "yuao", full: "Южный административный округ", prep: "в ЮАО", about: "Крупный деловой район у Варшавского шоссе и Тульской с реконструированными мануфактурами и современными бизнес-центрами." },
  ЮЗАО: { slug: "yuzao", full: "Юго-Западный административный округ", prep: "в ЮЗАО", about: "Зелёный и престижный округ у Профсоюзной и Ленинского проспекта, рядом с университетами и научными центрами. Популярен у ИТ- и образовательных компаний." },
  ЗАО: { slug: "zao", full: "Западный административный округ", prep: "в ЗАО", about: "Округ вдоль Кутузовского проспекта с бизнес-центрами класса A, близостью к Москва-Сити и деловой репутацией, сравнимой с центром." },
  СЗАО: { slug: "szao", full: "Северо-Западный административный округ", prep: "в СЗАО", about: "Округ Тушино, Строгино и Щукино с доступными бизнес-центрами и хорошей экологией. Выгодный вариант для старта компании." },
};

export const okrugSlug = (okrug: string) => OKRUG_INFO[okrug]?.slug ?? okrug.toLowerCase();

export const OKRUG_LIST = Object.keys(OKRUG_INFO).filter((o) => ADDRESSES.some((a) => a.okrug === o));

export type Okrug = OkrugInfo & {
  code: string;
  addresses: Address[];
  districts: string[];
  ifns: string[];
  metros: string[];
  minPrice: number;
};

export const getOkrugBySlug = (slug: string): Okrug | undefined => {
  const code = Object.keys(OKRUG_INFO).find((k) => OKRUG_INFO[k].slug === slug);
  if (!code) return undefined;
  const addresses = ADDRESSES.filter((a) => a.okrug === code);
  if (!addresses.length) return undefined;
  const u = (k: keyof Address) => Array.from(new Set(addresses.map((a) => String(a[k]))));
  return {
    ...OKRUG_INFO[code],
    code,
    addresses,
    districts: u("district"),
    ifns: u("ifns").sort((a, b) => Number(a) - Number(b)),
    metros: u("metro"),
    minPrice: Math.min(...addresses.map((a) => a.price)),
  };
};

export const getOkrugDescription = (o: Okrug) => [
  o.about,
  `В нашей базе ${o.prep} есть адреса в районах: ${o.districts.join(", ")}. Компании, зарегистрированные по ним, встают на учёт в ${o.ifns.length > 1 ? "инспекции" : "инспекцию"} ${o.ifns.map((n) => `ИФНС № ${n}`).join(", ")}.`,
  `Каждый адрес проверен: собственник подтверждает аренду при проверке ФНС, количество компаний на адресе ограничено, документы выдаём в день обращения. Ближайшие станции метро: ${o.metros.join(", ")}.`,
];
