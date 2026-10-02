export type Address = {
  id: number;
  street: string;
  ifns: string;
  okrug: string;
  district: string;
  metro: string;
  prices: AddressPrices;
  price: number;
  term: string;
  area: string;
  tags: string[];
  x: number;
  y: number;
  lat: number;
  lng: number;
};

export type AddressPrices = { create: number; inside: number; outside: number };

export const PRICE_LABELS: { key: keyof AddressPrices; label: string; hint: string }[] = [
  { key: "create", label: "Создание компании", hint: "Регистрация нового ООО или ИП на этом адресе" },
  { key: "inside", label: "Смена адреса внутри ИФНС", hint: "Переезд компании, которая уже стоит на учёте в этой инспекции" },
  { key: "outside", label: "Смена адреса из других ИФНС", hint: "Переезд компании из другой инспекции Москвы или региона" },
];

const RAW: Omit<Address, "price">[] = [
  { id: 1, street: "ул. Тверская, 18к1", ifns: "10", okrug: "ЦАО", district: "Тверской", metro: "Пушкинская", prices: { create: 14900, inside: 13400, outside: 17400 }, term: "11 мес.", area: "Бизнес-центр класса B+", tags: ["Почта", "Секретарь"], x: 49, y: 45, lat: 55.7666, lng: 37.6043 },
  { id: 2, street: "Страстной б-р, 4с3", ifns: "10", okrug: "ЦАО", district: "Тверской", metro: "Чеховская", prices: { create: 17500, inside: 16000, outside: 20000 }, term: "11 мес.", area: "Особняк, 3 этаж", tags: ["Почта", "Рабочее место"], x: 51, y: 43, lat: 55.7667, lng: 37.608 },
  { id: 3, street: "ул. Малая Дмитровка, 8", ifns: "10", okrug: "ЦАО", district: "Тверской", metro: "Тверская", prices: { create: 16200, inside: 14700, outside: 18700 }, term: "11 мес.", area: "Административное здание", tags: ["Почта"], x: 47, y: 42, lat: 55.768, lng: 37.607 },
  { id: 4, street: "Газетный пер., 9с2", ifns: "10", okrug: "ЦАО", district: "Тверской", metro: "Охотный Ряд", prices: { create: 19800, inside: 18300, outside: 22300 }, term: "11 мес.", area: "Бизнес-центр класса A", tags: ["Почта", "Секретарь", "Переговорная"], x: 50, y: 48, lat: 55.759, lng: 37.607 },
  { id: 5, street: "ул. Покровка, 31с1", ifns: "9", okrug: "ЦАО", district: "Басманный", metro: "Курская", prices: { create: 15400, inside: 13900, outside: 17900 }, term: "11 мес.", area: "Особняк", tags: ["Почта"], x: 56, y: 47, lat: 55.759, lng: 37.649 },
  { id: 6, street: "Пресненская наб., 12", ifns: "3", okrug: "ЦАО", district: "Пресненский", metro: "Деловой центр", prices: { create: 24500, inside: 23000, outside: 27000 }, term: "11 мес.", area: "Москва-Сити, башня Федерация", tags: ["Почта", "Секретарь", "Переговорная"], x: 40, y: 47, lat: 55.7495, lng: 37.539 },
  { id: 7, street: "ул. Большая Ордынка, 40с4", ifns: "5", okrug: "ЦАО", district: "Якиманка", metro: "Третьяковская", prices: { create: 16900, inside: 15400, outside: 19400 }, term: "11 мес.", area: "Бизнес-центр класса B", tags: ["Почта", "Рабочее место"], x: 52, y: 53, lat: 55.737, lng: 37.626 },
  { id: 8, street: "Ленинградский пр-т, 37", ifns: "14", okrug: "САО", district: "Аэропорт", metro: "Динамо", prices: { create: 11900, inside: 10400, outside: 14400 }, term: "11 мес.", area: "Бизнес-центр «Аэростар»", tags: ["Почта"], x: 43, y: 32, lat: 55.79, lng: 37.555 },
  { id: 9, street: "Дмитровское ш., 71Б", ifns: "13", okrug: "САО", district: "Бескудниковский", metro: "Петровско-Разумовская", prices: { create: 9800, inside: 8300, outside: 12300 }, term: "11 мес.", area: "Офисное здание", tags: ["Почта"], x: 48, y: 22, lat: 55.86, lng: 37.548 },
  { id: 10, street: "пр-т Мира, 102с34", ifns: "17", okrug: "СВАО", district: "Алексеевский", metro: "Алексеевская", prices: { create: 10900, inside: 9400, outside: 13400 }, term: "11 мес.", area: "Бизнес-парк", tags: ["Почта", "Секретарь"], x: 60, y: 30, lat: 55.811, lng: 37.639 },
  { id: 11, street: "ул. Электрозаводская, 27с8", ifns: "18", okrug: "ВАО", district: "Преображенское", metro: "Электрозаводская", prices: { create: 9400, inside: 7900, outside: 11900 }, term: "11 мес.", area: "Лофт-квартал", tags: ["Почта"], x: 70, y: 42, lat: 55.784, lng: 37.705 },
  { id: 12, street: "Волгоградский пр-т, 42к5", ifns: "22", okrug: "ЮВАО", district: "Текстильщики", metro: "Текстильщики", prices: { create: 8900, inside: 7400, outside: 11400 }, term: "11 мес.", area: "Технопарк", tags: ["Почта"], x: 68, y: 64, lat: 55.711, lng: 37.728 },
  { id: 13, street: "Варшавское ш., 9с1", ifns: "26", okrug: "ЮАО", district: "Донской", metro: "Тульская", prices: { create: 10500, inside: 9000, outside: 13000 }, term: "11 мес.", area: "Бизнес-центр «Даниловская мануфактура»", tags: ["Почта", "Переговорная"], x: 52, y: 66, lat: 55.705, lng: 37.623 },
  { id: 14, street: "ул. Профсоюзная, 65к1", ifns: "28", okrug: "ЮЗАО", district: "Обручевский", metro: "Калужская", prices: { create: 9900, inside: 8400, outside: 12400 }, term: "11 мес.", area: "Бизнес-центр класса B", tags: ["Почта"], x: 38, y: 72, lat: 55.66, lng: 37.541 },
  { id: 15, street: "Кутузовский пр-т, 36с3", ifns: "30", okrug: "ЗАО", district: "Дорогомилово", metro: "Кутузовская", prices: { create: 13900, inside: 12400, outside: 16400 }, term: "11 мес.", area: "Бизнес-центр класса A", tags: ["Почта", "Секретарь"], x: 32, y: 50, lat: 55.741, lng: 37.532 },
  { id: 16, street: "ул. Свободы, 35с39", ifns: "33", okrug: "СЗАО", district: "Южное Тушино", metro: "Сходненская", prices: { create: 8700, inside: 7200, outside: 11200 }, term: "11 мес.", area: "Бизнес-центр «Тушино»", tags: ["Почта"], x: 26, y: 28, lat: 55.848, lng: 37.45 },
];

export const ADDRESSES: Address[] = RAW.map((a) => ({ ...a, price: Math.min(a.prices.create, a.prices.inside, a.prices.outside) }));

export const uniq = (key: keyof Address) =>
  Array.from(new Set(ADDRESSES.map((a) => String(a[key])))).sort((a, b) =>
    key === "ifns" ? Number(a) - Number(b) : a.localeCompare(b, "ru"),
  );

export const formatPrice = (n: number) => n.toLocaleString("ru-RU").replace(/,/g, " ");

export type Filters = {
  query: string;
  ifns: string;
  okrug: string;
  district: string;
  metro: string;
};

export const EMPTY_FILTERS: Filters = { query: "", ifns: "all", okrug: "all", district: "all", metro: "all" };

export const applyFilters = (list: Address[], f: Filters) => {
  const q = f.query.trim().toLowerCase();
  return list.filter((a) => {
    if (f.ifns !== "all" && a.ifns !== f.ifns) return false;
    if (f.okrug !== "all" && a.okrug !== f.okrug) return false;
    if (f.district !== "all" && a.district !== f.district) return false;
    if (f.metro !== "all" && a.metro !== f.metro) return false;
    if (q) {
      const hay = `${a.street} ифнс ${a.ifns} ${a.okrug} ${a.district} ${a.metro}`.toLowerCase();
      if (!hay.includes(q.replace("№", "").trim())) return false;
    }
    return true;
  });
};

export const plural = (n: number, forms: [string, string, string]) => {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return forms[0];
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
  return forms[2];
};

const PHOTOS = {
  a: "https://cdn.poehali.dev/projects/59523c27-a9b3-49d8-adc5-d0bc3334a737/files/d6c1e986-34f3-4b4d-976d-32f968cbd95a.jpg",
  mansion: "https://cdn.poehali.dev/projects/59523c27-a9b3-49d8-adc5-d0bc3334a737/files/4d1697b7-a21f-432a-a304-ea519e967307.jpg",
  loft: "https://cdn.poehali.dev/projects/59523c27-a9b3-49d8-adc5-d0bc3334a737/files/a94c2b93-a00d-484a-9e7d-f31fb4f7aac1.jpg",
  b: "https://cdn.poehali.dev/projects/59523c27-a9b3-49d8-adc5-d0bc3334a737/files/8ba1eaa5-bed2-4bd2-ad2f-7b9c31c7c51c.jpg",
};

export const getPhoto = (a: Address) => {
  const t = a.area.toLowerCase();
  if (t.includes("особняк")) return PHOTOS.mansion;
  if (t.includes("лофт") || t.includes("технопарк") || t.includes("мануфактура")) return PHOTOS.loft;
  if (t.includes("класса a") || t.includes("сити") || t.includes("b+")) return PHOTOS.a;
  return PHOTOS.b;
};

export const getDescription = (a: Address) => [
  `Юридический адрес по адресу ${a.street} (${a.district}, ${a.okrug}) — объект «${a.area}» в нескольких минутах пешком от станции метро «${a.metro}». Адрес закреплён за ИФНС № ${a.ifns}, регистрация проходит без выездов в инспекцию.`,
  `Собственник предоставляет гарантийное письмо и договор аренды на ${a.term}, помещение реально существует и готово к проверке налоговой. Адрес не является массовым — в нём зарегистрировано ограниченное число компаний.`,
  `В стоимость входят: ${a.tags.map((t) => t.toLowerCase()).join(", ")}, подтверждение присутствия при визите ФНС и поддержка менеджера на весь срок договора.`,
];

export const getAddress = (id: number) => ADDRESSES.find((a) => a.id === id);
