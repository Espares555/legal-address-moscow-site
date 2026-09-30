import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useReveal } from "@/hooks/use-reveal";
import { ARTICLES } from "@/data/articles";
import ArticleCard from "./ArticleCard";

export default function ArticlesSection() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="articles" ref={ref} className="scroll-mt-20 border-t border-line bg-background">
      <div className="mx-3 border-x border-line lg:mx-[18px]">
        <div className="grid gap-6 border-b border-line px-6 py-14 lg:grid-cols-[420px_1fr] lg:px-0 lg:py-0">
          <div className="reveal lg:border-r lg:border-line lg:py-16 lg:pl-14">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">05 / Статьи</span>
          </div>
          <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:px-14 lg:py-16">
            <h2 className="font-head text-[40px] font-extrabold leading-[1] tracking-[-0.035em] md:text-[56px]">
              Полезные
              <br />
              <span className="text-primary">статьи</span>
            </h2>
            <Link to="/articles" className="inline-flex items-center gap-2 font-semibold hover:text-primary">
              Все статьи <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLES.slice(0, 4).map((a) => (
            <ArticleCard key={a.slug} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
