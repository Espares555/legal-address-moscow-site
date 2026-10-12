export type ContactItem = { icon: string; label: string; value: string; href?: string };

export const CONTACTS: ContactItem[] = [
  { icon: "Phone", label: "Телефон", value: "+7 495 226-15-49", href: "tel:+74952261549" },
  { icon: "Mail", label: "Почта", value: "hello@mercury-law.ru", href: "mailto:hello@mercury-law.ru" },
  { icon: "MapPin", label: "Офис", value: "Москва, ул. Верхняя Радищевская, д. 5" },
  { icon: "Clock", label: "Часы работы", value: "Пн–Пт 9:00–20:00, Сб 10:00–16:00" },
];

export const OFFICE = {
  address: "Москва, ул. Верхняя Радищевская, д. 5",
  lat: 55.7437,
  lng: 37.651,
  metro: [
    { name: "Таганская", walk: "6 мин пешком" },
    { name: "Марксистская", walk: "8 мин пешком" },
  ],
  howTo:
    "От метро «Таганская» выйдите на Таганскую площадь и идите по Верхней Радищевской улице в сторону Яузской. Дом 5 — по правой стороне, вход со двора.",
  parking: "Городская парковка вдоль Верхней Радищевской улицы и в соседних переулках.",
  max: "https://max.ru/",
  messengers: [
    { label: "Telegram", icon: "Send", href: "https://t.me/merkuriy_adres" },
    { label: "WhatsApp", icon: "MessageCircle", href: "https://wa.me/74952261549" },
  ],
};
