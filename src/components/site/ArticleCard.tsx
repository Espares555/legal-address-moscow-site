import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Article, formatDate } from "@/data/articles";

export default function ArticleCard({ a }: { a: Article }) {
  return (
    <Link to={`/articles/${a.slug}`} className="group flex flex-col border-b border-line transition-colors hover:bg-surface sm:border-r">
      <div className={`h-2 ${a.color}`} />
      <div className="flex flex-1 flex-col p-6 lg:p-9">
        <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.12em]">
          <span className="bg-primary/10 px-2 py-0.5 text-primary">{a.tag}</span>
          <span className="text-muted-foreground">{a.readTime} мин</span>
        </div>
        <h3 className="mt-5 font-head text-[24px] font-extrabold leading-[1.15] tracking-[-0.02em] group-hover:text-primary">{a.title}</h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{a.lead}</p>
        <div className="mt-6 flex items-center justify-between text-[13.5px] text-muted-foreground">
          <span>{formatDate(a.date)}</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-foreground group-hover:text-primary">
            Читать <Icon name="ArrowRight" size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
