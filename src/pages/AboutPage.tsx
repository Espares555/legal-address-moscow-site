import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RequestDialog from "@/components/site/RequestDialog";
import RequestForm from "@/components/site/RequestForm";
import { ADDRESSES } from "@/data/addresses";
import { SERVICES } from "@/data/services";
import { abs, breadcrumbs, useSeo } from "@/lib/seo";

const CDN = "https://cdn.poehali.dev/projects/59523c27-a9b3-49d8-adc5-d0bc3334a737/files/";

const GALLERY = [
  { src: CDN + "240195ce-b572-45d2-b62d-ebd95f9fd17e.jpg", alt: "Команда юристов компании «Меркурий»", cls: "sm:col-span-2 sm:row-span-2" },
  { src: CDN + "e067d51d-9edb-4e13-baa4-bf982435e624.jpg", alt: "Ресепшн офиса «Меркурий»", cls: "" },
  { src: CDN + "11e5eb1a-63f9-4f49-96d9-5f16663fb70b.jpg", alt: "Руководитель компании", cls: "" },
  { src: CDN + "a015f926-3270-4def-81a3-5b7242f71929.jpg", alt: "Юрист передаёт документы клиенту", cls: "" },
  { src: CDN + "6fe682a1-e24a-47c8-8d37-82e6454ca695.jpg", alt: "Рабочее пространство офиса", cls: "" },
  { src: CDN + "a5191a1e-233d-40cb-a542-1df48892b1c3.jpg", alt: "Переговорная комната", cls: "sm:col-span-4" },
];

const REQUISITES: [string, string][] = [
  ["Полное наименование", "Общество с ограниченной ответственностью «Меркурий»"],
  ["Сокращённое наименование", "ООО «Меркурий»"],
  ["Дата регистрации", "1993 год"],
  ["ИНН", "7700000000"],
  ["КПП", "770001001"],
  ["ОГРН", "1027700000000"],
  ["Юридический адрес", "125009, г. Москва, ул. Тверская, д. 18, корп. 1"],
  ["Генеральный директор", "Иванов Иван Иванович"],
  ["Расчётный счёт", "40702810000000000000"],
  ["Банк", "ПАО Сбербанк, г. Москва"],
  ["БИК", "044525225"],
  ["Корр. счёт", "30101810400000000225"],
];

const YEARS = new Date().getFullYear() - 1993;

const STATS: [string, string][] = [
  ["1993", "год основания компании"],
  [`${YEARS}+`, "лет на рынке юридических услуг"],
  [`${ADDRESSES.length}`, "проверенных адресов в базе"],
  ["0", "отказов ФНС из-за наших адресов"],
];

const VALUES = [
  { icon: "ShieldCheck", title: "Репутация прежде всего", text: "Работаем только с собственниками, которых знаем лично. Каждый адрес проверен и подтверждается при проверке налоговой." },
  { icon: "FileCheck", title: "Прозрачные условия", text: "Цена фиксируется в договоре. Никаких доплат за гарантийное письмо, подписание и продление." },
  { icon: "Handshake", title: "Гарантия результата", text: "Если налоговая откажет из-за адреса — бесплатно заменим адрес или вернём деньги. Это прописано в договоре." },
  { icon: "Users", title: "Команда юристов", text: "Регистрируем компании, меняем адреса и сопровождаем бизнес. Консультируем бесплатно и простым языком." },
];

const TIMELINE = [
  { year: "1993", text: "Компания зарегистрирована и начала работу — помогаем предпринимателям с регистрацией первых кооперативов и ТОО." },
  { year: "2000-е", text: "Сформировали собственную базу юридических адресов в Москве и наладили работу с проверенными собственниками." },
  { year: "2010-е", text: "Добавили почтовое обслуживание, смену адреса и перевод компаний из регионов в Москву." },
  { year: "Сегодня", text: "Онлайн-каталог адресов с фильтрами по ИФНС, округу, району и метро, партнёрство со Сбербанком, Альфа-Банком и Т-Банком." },
];

export default function AboutPage() {
  const [dialog, setDialog] = useState(false);
  const [photo, setPhoto] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const copyRequisites = () => {
    navigator.clipboard.writeText(REQUISITES.map(([k, v]) => `${k}: ${v}`).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title: "О компании Меркурий — юридические адреса в Москве с 1993 года",
    description: "Компания «Меркурий» зарегистрирована и работает с 1993 года. Проверенные юридические адреса в Москве, регистрация ООО и ИП, смена адреса, почтовое обслуживание. Реквизиты, офис и команда.",
    image: GALLERY[0].src,
    schema: [
      breadcrumbs([["О компании", "/about"]]),
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "О компании «Меркурий»",
        url: abs("/about"),
        mainEntity: { "@id": abs("/#organization") },
        primaryImageOfPage: GALLERY[0].src,
      },
      {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: "Офис и команда «Меркурий»",
        image: GALLERY.map((g) => ({ "@type": "ImageObject", contentUrl: g.src, caption: g.alt })),
      },
    ],
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header onPick={() => setDialog(true)} />
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <nav className="flex items-center gap-2 border-b border-line px-6 py-4 text-[14px] text-muted-foreground lg:px-9">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">О компании</span>
        </nav>

        <header className="grid border-b border-line lg:grid-cols-[1.25fr_1fr]">
          <div className="p-6 lg:border-r lg:border-line lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">О компании</span>
            <h1 className="mt-4 font-head text-[40px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[64px]">
              Держим репутацию
              <br />
              <span className="text-primary">с 1993 года</span>
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
              Компания «Меркурий» зарегистрирована и работает с 1993 года. За это время мы помогли тысячам предпринимателей зарегистрировать бизнес,
              подобрать надёжный юридический адрес и спокойно проходить проверки налоговой.
            </p>
          </div>
          <div className="relative flex flex-col justify-end overflow-hidden bg-band-4 p-6 text-white lg:p-12">
            <div className="absolute inset-x-0 top-0 grid grid-rows-3" aria-hidden="true">
              <div className="h-10 bg-band-1" />
              <div className="h-10 bg-band-2" />
              <div className="h-10 bg-band-3" />
            </div>
            <span className="mt-32 font-head text-[96px] font-extrabold leading-none tracking-[-0.05em] md:text-[140px]">1993</span>
            <p className="mt-3 text-white/75">год регистрации компании</p>
          </div>
        </header>

        <dl className="grid grid-cols-2 gap-px border-b border-line bg-line lg:grid-cols-4">
          {STATS.map(([v, k]) => (
            <div key={k} className="bg-background p-6 lg:p-9">
              <dt className="font-head text-[40px] font-extrabold leading-none tracking-[-0.03em] text-primary">{v}</dt>
              <dd className="mt-2 text-[14.5px] text-muted-foreground">{k}</dd>
            </div>
          ))}
        </dl>

        <section className="grid border-b border-line lg:grid-cols-[420px_1fr]">
          <div className="px-6 pt-10 lg:border-r lg:border-line lg:py-12 lg:pl-14">
            <h2 className="font-head text-[30px] font-extrabold tracking-[-0.03em]">Наша история</h2>
          </div>
          <ol className="px-6 py-8 lg:px-14 lg:py-12">
            {TIMELINE.map((t, i) => (
              <li key={t.year} className="relative flex gap-6 pb-8 last:pb-0">
                {i < TIMELINE.length - 1 && <span className="absolute bottom-0 left-[9px] top-6 w-[3px] bg-line" aria-hidden="true" />}
                <span className="relative z-[1] mt-1.5 h-5 w-5 flex-none rounded-full border-[3px] border-primary bg-background" />
                <div>
                  <p className="font-head text-[22px] font-extrabold text-primary">{t.year}</p>
                  <p className="mt-1 max-w-2xl text-[16px] leading-relaxed text-foreground/85">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-b border-line">
          <h2 className="border-b border-line px-6 py-8 font-head text-[30px] font-extrabold tracking-[-0.03em] lg:px-14">Почему нам доверяют</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="border-b border-line p-6 sm:border-r lg:border-b-0 lg:p-9 lg:last:border-r-0">
                <span className="grid h-12 w-12 place-items-center bg-surface text-primary">
                  <Icon name={v.icon} size={22} />
                </span>
                <h3 className="mt-5 text-[18px] font-bold">{v.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b border-line">
          <div className="flex flex-col justify-between gap-3 border-b border-line px-6 py-8 lg:flex-row lg:items-end lg:px-14">
            <h2 className="font-head text-[30px] font-extrabold tracking-[-0.03em]">Офис и команда</h2>
            <p className="max-w-md text-muted-foreground">Приезжайте в гости — подпишем документы, ответим на вопросы и угостим кофе.</p>
          </div>
          <div className="grid auto-rows-[220px] gap-px bg-line sm:grid-cols-4 lg:auto-rows-[260px]">
            {GALLERY.map((g, i) => (
              <button key={g.src} onClick={() => setPhoto(i)} className={`group relative overflow-hidden bg-background ${g.cls}`} aria-label={g.alt}>
                <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/80 px-4 py-2.5 text-left text-[13.5px] font-medium text-ink-foreground transition-transform group-hover:translate-y-0">
                  {g.alt}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="requisites" className="grid scroll-mt-24 border-b border-line lg:grid-cols-[420px_1fr]">
          <div className="px-6 pt-10 lg:border-r lg:border-line lg:py-12 lg:pl-14 lg:pr-10">
            <h2 className="font-head text-[30px] font-extrabold tracking-[-0.03em]">Реквизиты</h2>
            <p className="mt-3 text-muted-foreground">Компания зарегистрирована и работает с 1993 года.</p>
            <button
              onClick={copyRequisites}
              className="mt-6 inline-flex h-11 items-center gap-2 bg-ink px-5 font-semibold text-ink-foreground transition-colors hover:bg-primary"
            >
              <Icon name={copied ? "Check" : "Copy"} size={16} />
              {copied ? "Скопировано" : "Скопировать реквизиты"}
            </button>
          </div>
          <dl className="px-6 py-6 lg:px-14 lg:py-10">
            {REQUISITES.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-line py-3.5 last:border-b-0 sm:grid-cols-[220px_1fr] sm:gap-6">
                <dt className="text-[14px] text-muted-foreground">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="border-b border-line bg-surface px-6 py-10 lg:px-14">
          <h2 className="mb-5 text-[19px] font-semibold">Чем мы можем помочь</h2>
          <div className="flex flex-wrap gap-2.5">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="inline-flex h-9 items-center gap-2 border border-line bg-background px-4 text-[14px] font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Icon name={s.icon} size={15} className="text-primary" />
                {s.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid border-b border-line bg-ink text-ink-foreground lg:grid-cols-[1.25fr_1fr]">
          <div className="p-6 lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-band-1">С 1993 года</span>
            <h2 className="mt-4 font-head text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[44px]">
              Обсудим
              <br />
              вашу задачу
            </h2>
            <p className="mt-5 max-w-md text-ink-foreground/70">Перезвоним, подберём адрес или услугу и ответим на вопросы бесплатно.</p>
          </div>
          <div className="p-6 lg:p-12">
            <RequestForm subject="Обращение со страницы «О компании»" dark submitLabel="Отправить заявку" />
          </div>
        </section>
      </div>
      <Footer />
      <RequestDialog open={dialog} onOpenChange={setDialog} subject="" />
      {photo !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4" onClick={() => setPhoto(null)}>
          <button aria-label="Закрыть" className="absolute right-4 top-4 grid h-11 w-11 place-items-center bg-white/10 text-white hover:bg-white/20">
            <Icon name="X" size={22} />
          </button>
          <button
            aria-label="Назад"
            onClick={(e) => {
              e.stopPropagation();
              setPhoto((photo + GALLERY.length - 1) % GALLERY.length);
            }}
            className="absolute left-4 grid h-11 w-11 place-items-center bg-white/10 text-white hover:bg-white/20"
          >
            <Icon name="ChevronLeft" size={22} />
          </button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={GALLERY[photo].src} alt={GALLERY[photo].alt} className="max-h-[80vh] w-auto object-contain" />
            <figcaption className="mt-3 text-center text-white/80">{GALLERY[photo].alt}</figcaption>
          </figure>
          <button
            aria-label="Вперёд"
            onClick={(e) => {
              e.stopPropagation();
              setPhoto((photo + 1) % GALLERY.length);
            }}
            className="absolute right-4 grid h-11 w-11 place-items-center bg-white/10 text-white hover:bg-white/20"
          >
            <Icon name="ChevronRight" size={22} />
          </button>
        </div>
      )}
    </div>
  );
}
