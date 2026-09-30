export type Address = {
  id: number;
  street: string;
  ifns: string;
  okrug: string;
  district: string;
  metro: string;
  price: number;
  term: string;
  area: string;
  tags: string[];
  x: number;
  y: number;
};

export const ADDRESSES: Address[] = [
  { id: 1, street: "ул. Тверская, 18к1", ifns: "10", okrug: "ЦАО", district: "Тверской", metro: "Пушкинская", price: 14900, term: "11 мес.", area: "Бизнес-центр класса B+", tags: ["Почта", "Секретарь"], x: 49, y: 45 },
  { id: 2, street: "Страстной б-р, 4с3", ifns: "10", okrug: "ЦАО", district: "Тверской", metro: "Чеховская", price: 17500, term: "11 мес.", area: "Особняк, 3 этаж", tags: ["Почта", "Рабочее место"], x: 51, y: 43 },
  { id: 3, street: "ул. Малая Дмитровка, 8", ifns: "10", okrug: "ЦАО", district: "Тверской", metro: "Тверская", price: 16200, term: "11 мес.", area: "Административное здание", tags: ["Почта"], x: 47, y: 42 },
  { id: 4, street: "Газетный пер., 9с2", ifns: "10", okrug: "ЦАО", district: "Тверской", metro: "Охотный Ряд", price: 19800, term: "11 мес.", area: "Бизнес-центр класса A", tags: ["Почта", "Секретарь", "Переговорная"], x: 50, y: 48 },
  { id: 5, street: "ул. Покровка, 31с1", ifns: "9", okrug: "ЦАО", district: "Басманный", metro: "Курская", price: 15400, term: "11 мес.", area: "Особняк", tags: ["Почта"], x: 56, y: 47 },
  { id: 6, street: "Пресненская наб., 12", ifns: "3", okrug: "ЦАО", district: "Пресненский", metro: "Деловой центр", price: 24500, term: "11 мес.", area: "Москва-Сити, башня Федерация", tags: ["Почта", "Секретарь", "Переговорная"], x: 40, y: 47 },
  { id: 7, street: "ул. Большая Ордынка, 40с4", ifns: "5", okrug: "ЦАО", district: "Якиманка", metro: "Третьяковская", price: 16900, term: "11 мес.", area: "Бизнес-центр класса B", tags: ["Почта", "Рабочее место"], x: 52, y: 53 },
  { id: 8, street: "Ленинградский пр-т, 37", ifns: "14", okrug: "САО", district: "Аэропорт", metro: "Динамо", price: 11900, term: "11 мес.", area: "Бизнес-центр «Аэростар»", tags: ["Почта"], x: 43, y: 32 },
  { id: 9, street: "Дмитровское ш., 71Б", ifns: "13", okrug: "САО", district: "Бескудниковский", metro: "Петровско-Разумовская", price: 9800, term: "11 мес.", area: "Офисное здание", tags: ["Почта"], x: 48, y: 22 },
  { id: 10, street: "пр-т Мира, 102с34", ifns: "17", okrug: "СВАО", district: "Алексеевский", metro: "Алексеевская", price: 10900, term: "11 мес.", area: "Бизнес-парк", tags: ["Почта", "Секретарь"], x: 60, y: 30 },
  { id: 11, street: "ул. Электрозаводская, 27с8", ifns: "18", okrug: "ВАО", district: "Преображенское", metro: "Электрозаводская", price: 9400, term: "11 мес.", area: "Лофт-квартал", tags: ["Почта"], x: 70, y: 42 },
  { id: 12, street: "Волгоградский пр-т, 42к5", ifns: "22", okrug: "ЮВАО", district: "Текстильщики", metro: "Текстильщики", price: 8900, term: "11 мес.", area: "Технопарк", tags: ["Почта"], x: 68, y: 64 },
  { id: 13, street: "Варшавское ш., 9с1", ifns: "26", okrug: "ЮАО", district: "Донской", metro: "Тульская", price: 10500, term: "11 мес.", area: "Бизнес-центр «Даниловская мануфактура»", tags: ["Почта", "Переговорная"], x: 52, y: 66 },
  { id: 14, street: "ул. Профсоюзная, 65к1", ifns: "28", okrug: "ЮЗАО", district: "Обручевский", metro: "Калужская", price: 9900, term: "11 мес.", area: "Бизнес-центр класса B", tags: ["Почта"], x: 38, y: 72 },
  { id: 15, street: "Кутузовский пр-т, 36с3", ifns: "30", okrug: "ЗАО", district: "Дорогомилово", metro: "Кутузовская", price: 13900, term: "11 мес.", area: "Бизнес-центр класса A", tags: ["Почта", "Секретарь"], x: 32, y: 50 },
  { id: 16, street: "ул. Свободы, 35с39", ifns: "33", okrug: "СЗАО", district: "Южное Тушино", metro: "Сходненская", price: 8700, term: "11 мес.", area: "Бизнес-центр «Тушино»", tags: ["Почта"], x: 26, y: 28 },
];

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
