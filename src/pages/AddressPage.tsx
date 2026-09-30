import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RequestDialog from "@/components/site/RequestDialog";
import RequestForm from "@/components/site/RequestForm";
import YandexMap from "@/components/site/YandexMap";
import { ADDRESSES, formatPrice, getAddress, getDescription, getPhoto } from "@/data/addresses";
import NotFound from "./NotFound";

export default function AddressPage() {
  const { id } = useParams();
  const a = getAddress(Number(id));
  const [dialog, setDialog] = useState(false);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (a) document.title = `${a.street} — юридический адрес, ИФНС № ${a.ifns} | Меркурий`;
  }, [a]);

  if (!a) return <NotFound />;

  const order = () => {
    setSubject(`Интересует адрес: ${a.street} (ИФНС № ${a.ifns}, ${a.okrug})`);
    setDialog(true);
  };

  const similar = ADDRESSES.filter((x) => x.id !== a.id && (x.okrug === a.okrug || x.ifns === a.ifns)).slice(0, 4);

  const facts: [string, string, string][] = [
    ["Landmark", "ИФНС", `№ ${a.ifns}`],
    ["TrainFront", "Метро", a.metro],
    ["Map", "Округ", a.okrug],
    ["MapPinned", "Район", a.district],
    ["Building2", "Объект", a.area],
    ["CalendarClock", "Срок договора", a.term],
  ];

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header onPick={() => { setSubject(""); setDialog(true); }} />

      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <nav className="flex flex-wrap items-center gap-2 border-b border-line px-6 py-4 text-[14px] text-muted-foreground lg:px-9">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <a href="/#catalog" className="hover:text-primary">База адресов</a>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">{a.street}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.25fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden border-b border-line lg:aspect-auto lg:min-h-[560px] lg:border-r">
            <img src={getPhoto(a)} alt={`Здание по адресу ${a.street}`} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute left-4 top-4 flex gap-2 text-[12px] font-semibold uppercase tracking-[0.12em]">
              <span className="bg-primary px-2.5 py-1 text-primary-foreground">{a.okrug}</span>
              <span className="bg-background px-2.5 py-1">ИФНС № {a.ifns}</span>
            </div>
          </div>

          <div className="flex flex-col border-b border-line p-6 lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Юридический адрес</span>
            <h1 className="mt-4 font-head text-[36px] font-extrabold leading-[1.02] tracking-[-0.035em] md:text-[52px]">{a.street}</h1>
            <p className="mt-3 text-muted-foreground">
              {a.district}, {a.okrug} · м. {a.metro}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {a.tags.map((t) => (
                <span key={t} className="border border-line bg-surface px-2.5 py-1 text-[13px] font-medium">{t}</span>
              ))}
            </div>

            <div className="mt-auto pt-10">
              <div className="flex items-end gap-2">
                <span className="font-head text-[48px] font-extrabold leading-none tracking-[-0.03em]">{formatPrice(a.price)} ₽</span>
                <span className="pb-1.5 text-muted-foreground">/ {a.term}</span>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={order}
                  className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-sm bg-primary px-6 text-[16px] font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Заказать адрес <Icon name="ArrowUpRight" size={18} />
                </button>
                <a
                  href="tel:+74951234567"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-sm border border-line px-6 font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon name="Phone" size={16} /> Позвонить
                </a>
              </div>
            </div>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-px border-b border-line bg-line md:grid-cols-3 lg:grid-cols-6">
          {facts.map(([icon, k, v]) => (
            <div key={k} className="bg-background p-6">
              <Icon name={icon} size={20} className="text-primary" />
              <dt className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{k}</dt>
              <dd className="mt-1 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="grid lg:grid-cols-[1.25fr_1fr]">
          <div className="border-b border-line p-6 lg:border-r lg:p-12">
            <h2 className="font-head text-[30px] font-extrabold tracking-[-0.03em]">Об адресе</h2>
            <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-foreground/85">
              {getDescription(a).map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <h3 className="mt-10 text-[19px] font-bold">Что вы получаете</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {["Гарантийное письмо собственника", "Договор аренды на " + a.term, "Подтверждение при проверке ФНС", "Персональный менеджер"].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Icon name="CircleCheck" size={18} className="mt-0.5 flex-none text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-b border-line">
            <YandexMap addresses={[a]} activeId={a.id} zoom={15} className="h-[360px] lg:h-full lg:min-h-[420px]" />
          </div>
        </div>

        <div className="grid border-b border-line lg:grid-cols-[1.25fr_1fr]">
          <div className="p-6 lg:border-r lg:border-line lg:p-12">
            <h2 className="font-head text-[30px] font-extrabold tracking-[-0.03em]">Забронировать этот адрес</h2>
            <p className="mt-3 max-w-md text-muted-foreground">Оставьте телефон — менеджер подтвердит наличие и подготовит документы за 1 день.</p>
          </div>
          <div className="p-6 lg:p-12">
            <RequestForm subject={`Интересует адрес: ${a.street} (ИФНС № ${a.ifns}, ${a.okrug})`} />
          </div>
        </div>

        {similar.length > 0 && (
          <div className="border-b border-line">
            <h2 className="px-6 pt-10 font-head text-[30px] font-extrabold tracking-[-0.03em] lg:px-9">Похожие адреса</h2>
            <div className="mt-6 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((s) => (
                <Link key={s.id} to={`/address/${s.id}`} className="group border-b border-line p-6 transition-colors hover:bg-surface sm:border-r lg:p-9">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{s.okrug} · ИФНС № {s.ifns}</span>
                  <p className="mt-2 text-[17px] font-bold group-hover:text-primary">{s.street}</p>
                  <p className="mt-3 font-head text-[22px] font-extrabold">{formatPrice(s.price)} ₽</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <RequestDialog open={dialog} onOpenChange={setDialog} subject={subject} />
    </div>
  );
}
