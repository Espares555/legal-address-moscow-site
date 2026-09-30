import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useReveal } from "@/hooks/use-reveal";

const QA = [
  {
    q: "Чем юридический адрес отличается от массового?",
    a: "Массовым налоговая считает адрес, по которому зарегистрировано много компаний. Такие адреса часто становятся причиной отказа в регистрации. Все объекты в нашей базе проверены: число компаний на адресе ограничено, собственник известен.",
  },
  {
    q: "Какие документы я получу?",
    a: "Договор аренды (или субаренды), гарантийное письмо от собственника и копию свидетельства о праве собственности. Этого достаточно для регистрации ООО или смены адреса.",
  },
  {
    q: "Что будет, если налоговая откажет?",
    a: "Если отказ связан с адресом, мы бесплатно заменим его на другой или вернём деньги полностью. Это прописано в договоре.",
  },
  {
    q: "Можно ли выбрать конкретную инспекцию?",
    a: "Да. В каталоге есть фильтр по ИФНС — выберите нужную инспекцию, и мы покажем только адреса, которые к ней относятся.",
  },
  {
    q: "Как быстро можно получить документы?",
    a: "В день обращения, если адрес свободен. Подписать договор можно в офисе, с курьером или электронно.",
  },
  {
    q: "Приходит ли налоговая с проверкой?",
    a: "Проверки бывают. Собственник подтверждает, что компания действительно арендует помещение, а при тарифе с почтой мы принимаем и передаём всю корреспонденцию.",
  },
];

export default function Faq() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="faq" ref={ref} className="scroll-mt-20 border-t border-line bg-surface">
      <div className="mx-3 grid border-x border-line lg:mx-[18px] lg:grid-cols-[420px_1fr]">
        <div className="reveal border-b border-line px-6 py-14 lg:border-b-0 lg:border-r lg:py-16 lg:pl-14 lg:pr-10">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">04 / Вопросы</span>
          <h2 className="mt-6 font-head text-[40px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[56px]">
            Вопросы
            <br />и ответы
          </h2>
          <p className="mt-6 text-muted-foreground">Не нашли свой вопрос? Позвоните — юрист ответит бесплатно.</p>
          <a href="tel:+74951234567" className="mt-4 inline-block font-head text-2xl font-extrabold hover:text-primary">
            +7 495 123-45-67
          </a>
        </div>
        <div className="reveal bg-background px-6 lg:px-14">
          <Accordion type="single" collapsible defaultValue="0">
            {QA.map((item, i) => (
              <AccordionItem key={i} value={String(i)} className="border-line">
                <AccordionTrigger className="gap-4 py-6 text-left text-[17px] font-bold hover:text-primary hover:no-underline">
                  <span className="flex gap-5">
                    <span className="font-head text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-11 text-[15px] leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
