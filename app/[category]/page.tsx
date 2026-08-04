import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory } from "@/lib/articles";
import { categories, getCategory } from "@/lib/categories";
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

  return (
    <div className="container">
      <div className="page-head">
        <span className="eyebrow" style={{ color: found.color }}>
          {found.labelEn}
        </span>
        <h1>{found.label}</h1>
        <p>{found.description}</p>
      </div>

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
