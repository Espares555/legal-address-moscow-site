import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RequestDialog from "@/components/site/RequestDialog";
import RequestForm from "@/components/site/RequestForm";
import YandexMap from "@/components/site/YandexMap";
import CompactExtras from "@/components/site/CompactExtras";
import { CONTACTS, OFFICE } from "@/data/contacts";
import { breadcrumbs, organizationSchema, useSeo } from "@/lib/seo";

export default function ContactsPage() {
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title: "Контакты компании Меркурий — телефон, адрес офиса на Тверской, часы работы",
    description: `Офис «Меркурий»: ${OFFICE.address}, м. Пушкинская, Тверская, Чеховская. Телефон +7 495 123-45-67, Пн–Пт 9:00–20:00, Сб 10:00–16:00. Подбор юридического адреса за 15 минут.`,
    schema: [
      breadcrumbs([["Контакты", "/contacts"]]),
      { ...organizationSchema(), "@type": ["LegalService", "LocalBusiness"], hasMap: `https://yandex.ru/maps/?pt=${OFFICE.lng},${OFFICE.lat}&z=16` },
      { "@context": "https://schema.org", "@type": "ContactPage", name: "Контакты компании «Меркурий»" },
    ],
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header onPick={() => setDialog(true)} />
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <nav className="flex items-center gap-2 border-b border-line px-6 py-4 text-[14px] text-muted-foreground lg:px-9">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Контакты</span>
        </nav>

        <header className="border-b border-line p-6 lg:p-12">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Контакты</span>
          <h1 className="mt-4 font-head text-[40px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[60px]">
            Приезжайте
            <br />
            <span className="text-primary">или позвоните</span>
          </h1>
        </header>

        <dl className="grid gap-px border-b border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {CONTACTS.map((c) => (
            <div key={c.label} className="bg-background p-6 lg:p-9">
              <span className="grid h-11 w-11 place-items-center bg-surface text-primary">
                <Icon name={c.icon} size={20} />
              </span>
              <dt className="mt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{c.label}</dt>
              <dd className="mt-1 text-[17px] font-bold leading-snug">
                {c.href ? (
                  <a href={c.href} className="hover:text-primary">
                    {c.value}
                  </a>
                ) : (
                  c.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <section className="grid border-b border-line lg:grid-cols-[420px_1fr]">
          <div className="flex flex-col gap-8 border-b border-line p-6 lg:border-b-0 lg:border-r lg:p-10 lg:pl-14">
            <div>
              <h2 className="font-head text-[26px] font-extrabold tracking-[-0.03em]">Как добраться</h2>
              <ul className="mt-4 space-y-2.5">
                {OFFICE.metro.map((m) => (
                  <li key={m.name} className="flex items-center gap-3">
                    <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-primary text-[12px] font-bold text-primary-foreground">М</span>
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-[14px] text-muted-foreground">— {m.walk}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[15px] leading-relaxed text-foreground/85">{OFFICE.howTo}</p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-bold">
                <Icon name="Car" size={18} className="text-primary" /> Парковка
              </h3>
              <p className="mt-2 text-[15px] text-muted-foreground">{OFFICE.parking}</p>
            </div>
            <div>
              <h3 className="font-bold">Напишите в мессенджер</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {OFFICE.messengers.map((m) => (
                  <a
                    key={m.label}
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 border border-line px-4 font-semibold transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon name={m.icon} size={16} /> {m.label}
                  </a>
                ))}
              </div>
            </div>
            <a
              href={`https://yandex.ru/maps/?rtext=~${OFFICE.lat},${OFFICE.lng}&rtt=auto`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 bg-ink px-5 font-semibold text-ink-foreground transition-colors hover:bg-primary"
            >
              <Icon name="Navigation" size={17} /> Построить маршрут
            </a>
          </div>
          <YandexMap
            addresses={[]}
            office={{ lat: OFFICE.lat, lng: OFFICE.lng, title: "Офис «Меркурий»", text: OFFICE.address }}
            zoom={16}
            className="h-[380px] lg:h-full lg:min-h-[520px]"
          />
        </section>

        <section className="grid border-b border-line bg-ink text-ink-foreground lg:grid-cols-[1.25fr_1fr]">
          <div className="p-6 lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-band-1">Заявка</span>
            <h2 className="mt-4 font-head text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[44px]">
              Подберём адрес
              <br />
              за 15 минут
            </h2>
            <p className="mt-5 max-w-md text-ink-foreground/70">Опишите, что нужно, — пришлём 3–5 подходящих адресов с ценами.</p>
          </div>
          <div className="p-6 lg:p-12">
            <RequestForm subject="Заявка со страницы «Контакты»" dark submitLabel="Отправить заявку" />
          </div>
        </section>

        <CompactExtras />
      </div>
      <Footer />
      <RequestDialog open={dialog} onOpenChange={setDialog} subject="" />
    </div>
  );
}
