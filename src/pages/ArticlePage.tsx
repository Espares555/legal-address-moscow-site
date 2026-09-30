import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import RequestDialog from "@/components/site/RequestDialog";
import RequestForm from "@/components/site/RequestForm";
import ArticleCard from "@/components/site/ArticleCard";
import { ARTICLES, Block, formatDate, getArticle } from "@/data/articles";
import { getService } from "@/data/services";
import { DEFAULT_IMAGE, abs, breadcrumbs, useSeo } from "@/lib/seo";
import NotFound from "./NotFound";

function Content({ b }: { b: Block }) {
  if (b.type === "h2") return <h2 className="mt-10 font-head text-[26px] font-extrabold leading-tight tracking-[-0.02em]">{b.text}</h2>;
  if (b.type === "p") return <p className="mt-4">{b.text}</p>;
  if (b.type === "note")
    return (
      <div className="mt-6 flex gap-4 border-l-4 border-primary bg-surface p-5">
        <Icon name="Info" size={20} className="mt-0.5 flex-none text-primary" />
        <p className="text-[15.5px]">{b.text}</p>
      </div>
    );
  if (b.type === "list")
    return (
      <ul className="mt-4 space-y-2.5">
        {b.items.map((it) => (
          <li key={it} className="flex gap-3">
            <Icon name="Check" size={18} className="mt-1 flex-none text-primary" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  return (
    <ol className="mt-5 space-y-3">
      {b.items.map((it, i) => (
        <li key={it} className="flex gap-4">
          <span className="grid h-8 w-8 flex-none place-items-center bg-primary font-head text-[14px] font-extrabold text-primary-foreground">{i + 1}</span>
          <span className="pt-1">{it}</span>
        </li>
      ))}
    </ol>
  );
}

export default function ArticlePage() {
  const { slug = "" } = useParams();
  const a = getArticle(slug);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useSeo(
    a
      ? {
          title: `${a.seoTitle} | Меркурий`,
          description: a.seoDesc,
          type: "article",
          schema: [
            breadcrumbs([["Статьи", "/articles"], [a.title, `/articles/${a.slug}`]]),
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: a.title,
              description: a.seoDesc,
              datePublished: a.date,
              dateModified: a.date,
              inLanguage: "ru-RU",
              articleSection: a.tag,
              wordCount: a.body.reduce((n, b) => n + ("text" in b ? b.text : b.items.join(" ")).split(/\s+/).length, 0),
              mainEntityOfPage: abs(`/articles/${a.slug}`),
              image: DEFAULT_IMAGE,
              author: { "@type": "Organization", name: "Меркурий", url: abs("/about") },
              publisher: { "@id": abs("/#organization") },
            },
          ],
        }
      : { title: "Статья не найдена | Меркурий", description: "Страница не найдена", noindex: true },
  );

  if (!a) return <NotFound />;
  const service = a.service ? getService(a.service) : undefined;
  const more = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <div className="min-h-screen overflow-x-clip bg-background">
      <Header onPick={() => setDialog(true)} />
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <nav className="flex flex-wrap items-center gap-2 border-b border-line px-6 py-4 text-[14px] text-muted-foreground lg:px-9">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <Icon name="ChevronRight" size={14} />
          <Link to="/articles" className="hover:text-primary">Статьи</Link>
          <Icon name="ChevronRight" size={14} />
          <span className="line-clamp-1 text-foreground">{a.title}</span>
        </nav>

        <header className="border-b border-line">
          <div className={`h-3 ${a.color}`} />
          <div className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
            <div className="flex flex-wrap items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.12em]">
              <span className="bg-primary/10 px-2 py-0.5 text-primary">{a.tag}</span>
              <span className="text-muted-foreground">{formatDate(a.date)}</span>
              <span className="text-muted-foreground">· {a.readTime} мин чтения</span>
            </div>
            <h1 className="mt-5 font-head text-[36px] font-extrabold leading-[1.05] tracking-[-0.035em] md:text-[52px]">{a.title}</h1>
            <p className="mt-5 text-[19px] leading-relaxed text-muted-foreground">{a.lead}</p>
          </div>
        </header>

        <div className="grid border-b border-line lg:grid-cols-[1fr_380px]">
          <article className="px-6 py-10 text-[17px] leading-[1.7] text-foreground/85 lg:border-r lg:border-line lg:px-14 lg:py-12">
            <div className="mx-auto max-w-3xl">
              {a.body.map((b, i) => (
                <Content key={i} b={b} />
              ))}
            </div>
          </article>
          <aside className="bg-surface p-6 lg:p-9">
            <div className="lg:sticky lg:top-24">
              {service && (
                <Link to={`/services/${service.slug}`} className="group mb-8 block border border-line bg-background p-6 transition-colors hover:border-primary">
                  <span className="grid h-11 w-11 place-items-center bg-primary text-primary-foreground">
                    <Icon name={service.icon} size={20} />
                  </span>
                  <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Поможем под ключ</p>
                  <p className="mt-1 text-[18px] font-bold leading-snug group-hover:text-primary">{service.name}</p>
                  <p className="mt-2 font-head text-[22px] font-extrabold">{service.price}</p>
                </Link>
              )}
              <h2 className="font-head text-[22px] font-extrabold tracking-[-0.02em]">Остались вопросы?</h2>
              <p className="mb-5 mt-2 text-[14.5px] text-muted-foreground">Юрист перезвонит и бесплатно проконсультирует.</p>
              <RequestForm subject={`Вопрос по статье: ${a.title}`} submitLabel="Получить консультацию" />
            </div>
          </aside>
        </div>

        <h2 className="border-b border-line px-6 py-8 font-head text-[28px] font-extrabold tracking-[-0.03em] lg:px-9">Читайте также</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {more.map((x) => (
            <ArticleCard key={x.slug} a={x} />
          ))}
        </div>
      </div>
      <Footer />
      <RequestDialog open={dialog} onOpenChange={setDialog} subject="" />
    </div>
  );
}
