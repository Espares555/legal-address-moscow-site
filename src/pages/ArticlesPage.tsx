import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RequestDialog from "@/components/site/RequestDialog";
import ArticleCard from "@/components/site/ArticleCard";
import { ARTICLES } from "@/data/articles";
import { setMeta } from "@/lib/meta";

export default function ArticlesPage() {
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Статьи о регистрации ООО и юридических адресах | Меркурий";
    setMeta("description", "Полезные статьи о регистрации ООО, выборе и смене юридического адреса, почтовом обслуживании и работе с налоговой в Москве.");
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header onPick={() => setDialog(true)} />
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <nav className="flex items-center gap-2 border-b border-line px-6 py-4 text-[14px] text-muted-foreground lg:px-9">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Статьи</span>
        </nav>
        <header className="grid border-b border-line lg:grid-cols-[420px_1fr]">
          <div className="px-6 pt-10 lg:border-r lg:border-line lg:py-16 lg:pl-14">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Блог</span>
          </div>
          <div className="flex flex-col justify-between gap-6 px-6 pb-10 pt-4 lg:flex-row lg:items-end lg:px-14 lg:py-16">
            <h1 className="font-head text-[44px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[64px]">
              Статьи
              <br />
              <span className="text-primary">и инструкции</span>
            </h1>
            <p className="max-w-[340px] text-muted-foreground">Разбираем регистрацию компаний, выбор юридического адреса и общение с налоговой простым языком.</p>
          </div>
        </header>
        <div className="grid sm:grid-cols-2">
          {ARTICLES.map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
      </div>
      <Footer />
      <RequestDialog open={dialog} onOpenChange={setDialog} subject="" />
    </div>
  );
}
