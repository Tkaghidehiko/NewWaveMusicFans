import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/articles";
import { getCategory } from "@/lib/categories";

export default function ArticleCard({ article }: { article: Article }) {
  const category = getCategory(article.category);

  return (
    <Link href={`/articles/${article.slug}`} className="card">
      <div
        className="card-thumb"
        style={{
          background: category?.gradient,
          color: category?.color,
        }}
      >
        ♪
      </div>
      <div className="card-body">
        <span className="card-cat" style={{ color: category?.color }}>
          {category?.labelEn}
        </span>
        <p className="card-title">{article.title}</p>
        <p className="card-date">{formatDate(article.publishedAt)}</p>
      </div>
    </Link>
  );
}
