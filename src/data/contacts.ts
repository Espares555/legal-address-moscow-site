export type ContactItem = { icon: string; label: string; value: string; href?: string };

export const CONTACTS: ContactItem[] = [
  { icon: "Phone", label: "Телефон", value: "+7 495 123-45-67", href: "tel:+74951234567" },
  { icon: "Mail", label: "Почта", value: "hello@mercury-law.ru", href: "mailto:hello@mercury-law.ru" },
  { icon: "MapPin", label: "Офис", value: "Москва, ул. Тверская, 18к1, офис 305" },
  { icon: "Clock", label: "Часы работы", value: "Пн–Пт 9:00–20:00, Сб 10:00–16:00" },
];

export const OFFICE = {
  address: "Москва, ул. Тверская, 18к1, офис 305",
  lat: 55.7666,
  lng: 37.6043,
  metro: [
    { name: "Пушкинская", walk: "3 мин пешком" },
    { name: "Тверская", walk: "4 мин пешком" },
    { name: "Чеховская", walk: "5 мин пешком" },
  ],
  howTo:
    "Выход из метро к Тверской улице, далее 200 м в сторону Садового кольца. Вход в бизнес-центр со стороны Тверской, на ресепшене назовите компанию «Меркурий» — вас проводят на 3 этаж.",
  parking: "Платная городская парковка вдоль Тверской улицы и в соседних переулках.",
  messengers: [
    { label: "Telegram", icon: "Send", href: "https://t.me/merkuriy_adres" },
    { label: "WhatsApp", icon: "MessageCircle", href: "https://wa.me/74951234567" },
  ],
};
