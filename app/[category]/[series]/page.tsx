import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesBySeries } from "@/lib/articles";
import { getCategory } from "@/lib/categories";
import { seriesList, getSeries } from "@/lib/series";
import { buildSocialMetadata } from "@/lib/site";

type Props = { params: Promise<{ category: string; series: string }> };

export function generateStaticParams() {
  return seriesList.map((s) => ({ category: s.category, series: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, series } = await params;
  const found = getSeries(category, series);
  const parent = getCategory(category);
  if (!found || !parent) return {};

  const title = `${found.label} — ${parent.label}`;
  return {
    title,
    description: found.description,
    ...buildSocialMetadata({
      title,
      description: found.description,
      url: `/${category}/${series}`,
    }),
  };
}

export default async function SeriesPage({ params }: Props) {
  const { category, series } = await params;
  const found = getSeries(category, series);
  const parent = getCategory(category);
  if (!found || !parent) notFound();

  const articles = getArticlesBySeries(category, series);

  return (
    <div className="container">
      <div className="page-head">
        <span className="eyebrow" style={{ color: parent.color }}>
          <Link href={`/${parent.slug}`}>{parent.labelEn}</Link>
          {" / "}
          {found.labelEn}
        </span>
        <h1>{found.label}</h1>
        <p>{found.description}</p>
      </div>

      <p className="series-intro">{found.intro}</p>

      {articles.length > 0 ? (
        <div className="card-grid">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <p className="empty">この連載の記事はまだありません。</p>
      )}
    </div>
  );
}
