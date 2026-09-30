import Icon from "@/components/ui/icon";
import { useReveal } from "@/hooks/use-reveal";

const REVIEWS = [
  { name: "Анна Соколова", company: "ООО «Северный ветер»", rating: 5, text: "Нужен был адрес именно в ИФНС № 10. Подобрали за час, документы привезли курьером на следующий день. Регистрация прошла с первого раза." },
  { name: "Дмитрий Волков", company: "ООО «Техноплан»", rating: 5, text: "Меняли юрадрес при переезде. Менеджер объяснил все нюансы, помог с формой Р13014. Почту пересылают сканами — очень удобно." },
  { name: "Екатерина Лебедева", company: "ИП Лебедева Е. А.", rating: 5, text: "Брала адрес в ЦАО для небольшой студии. Цена честная, без скрытых доплат. Когда пришла проверка, собственник всё подтвердил." },
  { name: "Игорь Морозов", company: "ООО «Логистик Групп»", rating: 4, text: "Удобный каталог с фильтрами — сразу видно цену и метро. Документы получили в день обращения. Хотелось бы чуть больше адресов в САО." },
  { name: "Мария Кузнецова", company: "ООО «Зелёный квартал»", rating: 5, text: "Второй раз работаем с Меркурием. Продлили договор без лишних бумаг, напомнили заранее. Рекомендую коллегам." },
  { name: "Алексей Новиков", company: "ООО «Дата Софт»", rating: 5, text: "Регистрировали ИТ-компанию, нужен был адрес с переговорной. Нашли в Москва-Сити, всё прошло гладко и быстро." },
];

const initials = (n: string) => n.split(" ").map((w) => w[0]).join("").slice(0, 2);
const BANDS = ["bg-band-1", "bg-band-2", "bg-band-3", "bg-band-4"];

export default function Reviews() {
  const ref = useReveal<HTMLElement>();
  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1).replace(".", ",");

  return (
    <section id="reviews" ref={ref} className="scroll-mt-20 border-t border-line bg-background">
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <div className="grid gap-6 border-b border-line px-6 py-14 lg:grid-cols-[420px_1fr] lg:px-0 lg:py-0">
          <div className="reveal lg:border-r lg:border-line lg:py-16 lg:pl-14">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">04 / Отзывы</span>
          </div>
          <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:px-14 lg:py-16">
            <h2 className="font-head text-[40px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[56px]">
              Что говорят
              <br />
              <span className="text-primary">клиенты</span>
            </h2>
            <div className="flex items-end gap-4">
              <span className="font-head text-[56px] font-extrabold leading-none tracking-[-0.03em]">{avg}</span>
              <div className="pb-1.5">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-current" />
                  ))}
                </div>
                <p className="mt-1 text-[13.5px] text-muted-foreground">средняя оценка клиентов</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <article key={r.name} className="reveal flex flex-col border-b border-line px-6 py-8 sm:border-r lg:px-9">
              <div className="flex gap-0.5 text-primary" aria-label={`Оценка ${r.rating} из 5`}>
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon key={k} name="Star" size={16} className={k < r.rating ? "fill-current" : "text-line"} />
                ))}
              </div>
              <p className="mt-5 flex-1 text-[15.5px] leading-relaxed text-foreground/85">«{r.text}»</p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span className={`grid h-11 w-11 flex-none place-items-center rounded-full font-bold text-white ${BANDS[i % 4]}`}>{initials(r.name)}</span>
                <span>
                  <span className="block font-bold">{r.name}</span>
                  <span className="text-[13.5px] text-muted-foreground">{r.company}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
