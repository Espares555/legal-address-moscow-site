import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SITE_NAME = "Меркурий";
export const DEFAULT_IMAGE = "https://cdn.poehali.dev/projects/59523c27-a9b3-49d8-adc5-d0bc3334a737/files/240195ce-b572-45d2-b62d-ebd95f9fd17e.jpg";
export const PHONE = "+7 495 123-45-67";
export const EMAIL = "hello@mercury-law.ru";

type Json = Record<string, unknown>;

export type Seo = {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  schema?: Json[];
};

export const origin = () => window.location.origin;
export const abs = (path: string) => (path.startsWith("http") ? path : origin() + path);

const upsertMeta = (attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
};

export function useSeo(seo: Seo | null) {
  const { pathname } = useLocation();
  const key = seo ? JSON.stringify(seo) : "";

  useEffect(() => {
    if (!seo) return;
    const url = origin() + pathname;
    const image = seo.image ?? DEFAULT_IMAGE;

    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    upsertLink("canonical", url);

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", "ru_RU");
    upsertMeta("property", "og:type", seo.type ?? "website");
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", image);

    document.head.querySelectorAll("script[data-seo]").forEach((s) => s.remove());
    [websiteSchema(), organizationSchema(), ...(seo.schema ?? [])].forEach((data) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.seo = "1";
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, pathname]);
}

export const organizationSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": origin() + "/#organization",
  name: SITE_NAME,
  legalName: "ООО «Меркурий»",
  url: origin() + "/",
  logo: origin() + "/favicon.svg",
  image: DEFAULT_IMAGE,
  description: "Проверенные юридические адреса в Москве, регистрация ООО и ИП, смена юридического адреса, почтовое обслуживание. Работаем с 1993 года.",
  foundingDate: "1993",
  telephone: PHONE,
  email: EMAIL,
  priceRange: "₽₽",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Тверская, 18к1, офис 305",
    addressLocality: "Москва",
    addressRegion: "Москва",
    addressCountry: "RU",
  },
  geo: { "@type": "GeoCoordinates", latitude: 55.7666, longitude: 37.6043 },
  areaServed: { "@type": "City", name: "Москва" },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
  ],
});

export const websiteSchema = (): Json => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": origin() + "/#website",
  url: origin() + "/",
  name: SITE_NAME,
  inLanguage: "ru-RU",
  publisher: { "@id": origin() + "/#organization" },
});

export const breadcrumbs = (items: [string, string][]): Json => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [["Главная", "/"] as [string, string], ...items].map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: abs(path),
  })),
});

export const itemList = (name: string, items: { name: string; path: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  numberOfItems: items.length,
  itemListElement: items.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, url: abs(x.path) })),
});

export const faqSchema = (items: { q: string; a: string }[]): Json => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
});

export const parsePrice = (s: string) => {
  const n = Number(s.replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

type Addr = { id: number; street: string; price: number; lat: number; lng: number; metro: string; ifns: string; district: string; okrug: string };

export const addressListSchema = (name: string, list: Addr[]): Json => ({
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name,
  numberOfItems: list.length,
  itemListElement: list.map((a, i) => ({
    "@type": "Offer",
    position: i + 1,
    name: `Юридический адрес: ${a.street}`,
    url: abs(`/address/${a.id}`),
    price: a.price,
    priceCurrency: "RUB",
    availability: "https://schema.org/InStock",
    seller: { "@id": origin() + "/#organization" },
    itemOffered: {
      "@type": "Service",
      name: `Аренда юридического адреса ${a.street}`,
      areaServed: `${a.district}, ${a.okrug}, Москва`,
    },
  })),
});

export const placeSchema = (a: Addr, image: string, description: string): Json => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: `Юридический адрес: ${a.street}, Москва`,
  description,
  image,
  sku: `addr-${a.id}`,
  brand: { "@type": "Brand", name: SITE_NAME },
  category: "Аренда юридического адреса",
  offers: {
    "@type": "Offer",
    url: abs(`/address/${a.id}`),
    price: a.price,
    priceCurrency: "RUB",
    availability: "https://schema.org/InStock",
    seller: { "@id": origin() + "/#organization" },
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "ИФНС", value: `№ ${a.ifns}` },
    { "@type": "PropertyValue", name: "Метро", value: a.metro },
    { "@type": "PropertyValue", name: "Район", value: a.district },
    { "@type": "PropertyValue", name: "Округ", value: a.okrug },
    { "@type": "PropertyValue", name: "Координаты", value: `${a.lat}, ${a.lng}` },
  ],
});
