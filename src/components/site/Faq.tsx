import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useReveal } from "@/hooks/use-reveal";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { FAQ_ALL } from "@/data/faq";

const QA = FAQ_ALL.slice(0, 6);

export default function Faq() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="faq" ref={ref} className="scroll-mt-20 border-t border-line bg-surface">
      <div className="mx-3 grid border-x border-line lg:mx-[18px] lg:grid-cols-[420px_1fr]">
        <div className="reveal border-b border-line px-6 py-14 lg:border-b-0 lg:border-r lg:py-16 lg:pl-14 lg:pr-10">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">06 / Вопросы</span>
          <h2 className="mt-6 font-head text-[40px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[56px]">
            Вопросы
            <br />и ответы
          </h2>
          <p className="mt-6 text-muted-foreground">Не нашли свой вопрос? Позвоните — юрист ответит бесплатно.</p>
          <a href="tel:+74951234567" className="mt-4 inline-block font-head text-2xl font-extrabold hover:text-primary">
            +7 495 123-45-67
          </a>
          <Link to="/faq" className="mt-8 flex items-center gap-2 font-semibold text-primary hover:underline">
            Все вопросы и ответы ({FAQ_ALL.length}) <Icon name="ArrowRight" size={16} />
          </Link>
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
