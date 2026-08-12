import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory } from "@/lib/articles";
import { categories, getCategory } from "@/lib/categories";
import { getSeriesByCategory } from "@/lib/series";
import { buildSocialMetadata } from "@/lib/site";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const found = getCategory(category);
  if (!found) return {};

  return {
    title: found.label,
    description: found.description,
    ...buildSocialMetadata({
      title: found.label,
      description: found.description,
      url: `/${found.slug}`,
    }),
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const found = getCategory(category);
  if (!found) notFound();

  const articles = getArticlesByCategory(category);
  const series = getSeriesByCategory(category);

  return (
    <div
      className="container"
      data-kind={found.kind}
      data-category={found.slug}
      style={{ ["--accent" as string]: found.color }}
    >
      <div className="page-head">
        <span className="eyebrow" style={{ color: found.color }}>
          {found.labelEn}
        </span>
        <h1>{found.label}</h1>
        <p>{found.description}</p>
      </div>

      {series.length > 0 && (
        <nav className="series-nav" aria-label="連載">
          {series.map((s) => (
            <Link
              key={s.slug}
              href={`/${found.slug}/${s.slug}`}
              className="series-chip"
              style={{ ["--accent" as string]: found.color }}
            >
              <span className="name">{s.label}</span>
              <span className="desc">{s.description}</span>
            </Link>
          ))}
        </nav>
      )}

      {articles.length > 0 ? (
        <div className="card-grid">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <p className="empty">このカテゴリの記事はまだありません。</p>
      )}
    </div>
  );
}
