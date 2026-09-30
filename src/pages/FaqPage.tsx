import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RequestDialog from "@/components/site/RequestDialog";
import RequestForm from "@/components/site/RequestForm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ, FAQ_ALL } from "@/data/faq";
import { breadcrumbs, faqSchema, useSeo } from "@/lib/seo";

export default function FaqPage() {
  const [dialog, setDialog] = useState(false);
  const [group, setGroup] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSeo({
    title: "Вопросы и ответы о юридических адресах и регистрации ООО | Меркурий",
    description: "Ответы на частые вопросы о юридических адресах в Москве, регистрации и смене адреса ООО, проверках налоговой, почтовом обслуживании и открытии расчётного счёта.",
    schema: [breadcrumbs([["Вопросы и ответы", "/faq"]]), faqSchema(FAQ_ALL)],
  });

  const groups = useMemo(() => {
    const s = q.trim().toLowerCase();
    return FAQ.filter((g) => group === "all" || g.id === group)
      .map((g) => ({ ...g, items: g.items.filter((x) => !s || (x.q + " " + x.a).toLowerCase().includes(s)) }))
      .filter((g) => g.items.length);
  }, [group, q]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header onPick={() => setDialog(true)} />
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <nav className="flex items-center gap-2 border-b border-line px-6 py-4 text-[14px] text-muted-foreground lg:px-9">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Вопросы и ответы</span>
        </nav>

        <header className="grid border-b border-line lg:grid-cols-[420px_1fr]">
          <div className="px-6 pt-10 lg:border-r lg:border-line lg:py-16 lg:pl-14">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">FAQ</span>
          </div>
          <div className="flex flex-col justify-between gap-6 px-6 pb-10 pt-4 lg:flex-row lg:items-end lg:px-14 lg:py-16">
            <h1 className="font-head text-[44px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[64px]">
              Вопросы
              <br />
              <span className="text-primary">и ответы</span>
            </h1>
            <p className="max-w-[340px] text-muted-foreground">
              {FAQ_ALL.length} ответов о юридических адресах, регистрации компаний, проверках налоговой, почте и банках.
            </p>
          </div>
        </header>

        <div className="grid gap-px border-b border-line bg-line lg:grid-cols-[420px_1fr]">
          <label className="flex h-16 items-center gap-3 bg-surface px-6 lg:pl-14">
            <Icon name="Search" size={18} className="text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Поиск по вопросам"
              className="h-full w-full bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </label>
          <div className="flex items-center gap-2 overflow-x-auto bg-surface px-6 py-3 lg:px-14">
            {[{ id: "all", title: "Все" }, ...FAQ].map((g) => (
              <button
                key={g.id}
                onClick={() => setGroup(g.id)}
                className={`h-8 flex-none rounded-md px-3 text-[13px] font-semibold uppercase transition-colors ${group === g.id ? "bg-primary text-primary-foreground" : "bg-line/80 hover:bg-primary/15 hover:text-primary"}`}
              >
                {g.title}
              </button>
            ))}
          </div>
        </div>

        {groups.length === 0 ? (
          <div className="flex flex-col items-center gap-3 border-b border-line px-6 py-20 text-center">
            <Icon name="SearchX" size={40} className="text-primary" />
            <p className="font-head text-2xl font-bold">Не нашли ответ</p>
            <p className="max-w-md text-muted-foreground">Задайте вопрос юристу — ответим бесплатно.</p>
          </div>
        ) : (
          groups.map((g) => (
            <section key={g.id} className="grid border-b border-line lg:grid-cols-[420px_1fr]">
              <div className="px-6 pt-10 lg:border-r lg:border-line lg:py-12 lg:pl-14 lg:pr-10">
                <div className="lg:sticky lg:top-28">
                  <span className="grid h-12 w-12 place-items-center bg-primary text-primary-foreground">
                    <Icon name={g.icon} size={22} />
                  </span>
                  <h2 className="mt-5 font-head text-[28px] font-extrabold leading-tight tracking-[-0.03em]">{g.title}</h2>
                </div>
              </div>
              <div className="px-6 lg:px-14">
                <Accordion type="multiple">
                  {g.items.map((item, i) => (
                    <AccordionItem key={item.q} value={item.q} className="border-line last:border-b-0">
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
            </section>
          ))
        )}

        <section className="grid border-b border-line bg-ink text-ink-foreground lg:grid-cols-[1.25fr_1fr]">
          <div className="p-6 lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-band-1">Консультация</span>
            <h2 className="mt-4 font-head text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[44px]">
              Не нашли
              <br />
              свой вопрос?
            </h2>
            <p className="mt-5 max-w-md text-ink-foreground/70">Оставьте заявку или позвоните — юрист ответит бесплатно.</p>
            <a href="tel:+74951234567" className="mt-6 inline-block font-head text-2xl font-extrabold hover:text-band-1">
              +7 495 123-45-67
            </a>
          </div>
          <div className="p-6 lg:p-12">
            <RequestForm subject="Вопрос юристу" dark submitLabel="Задать вопрос" />
          </div>
        </section>
      </div>
      <Footer />
      <RequestDialog open={dialog} onOpenChange={setDialog} subject="" />
    </div>
  );
}
