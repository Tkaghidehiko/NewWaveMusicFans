import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllArticles,
  getArticle,
  renderMarkdown,
  formatDate,
} from "@/lib/articles";
import { getCategory } from "@/lib/categories";
import { getArtist } from "@/lib/artists";
import { getSeriesForArticle } from "@/lib/series";
import {
  absoluteUrl,
  buildSocialMetadata,
  jsonLdScript,
  siteName,
} from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.lead,
    ...buildSocialMetadata({
      title: article.title,
      description: article.lead,
      url: `/articles/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt || undefined,
      section: getCategory(article.category)?.label,
    }),
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const series = getSeriesForArticle(article.category, article.series);
  const html = renderMarkdown(article.body);

  // 構造化データ。検索結果でのリッチな表示と、記事の出典の明示に使う。
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.lead,
    datePublished: article.publishedAt || undefined,
    articleSection: series ? `${category?.label} / ${series.label}` : category?.label,
    inLanguage: "ja",
    mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
    image: absoluteUrl(`/articles/${article.slug}/opengraph-image`),
    publisher: { "@type": "Organization", name: siteName, url: absoluteUrl("/") },
    author: { "@type": "Organization", name: siteName, url: absoluteUrl("/") },
    citation: article.sources.map((s) => s.url),
    about: article.artists
      .map((s) => getArtist(s))
      .filter((a) => a !== undefined)
      .map((a) => ({ "@type": "MusicGroup", name: a.name })),
  };

  return (
    // data-kind でレイアウトが、data-category でコンセプトが切り替わる（globals.css 参照）
    <div
      className="container"
      data-kind={category?.kind}
      data-category={category?.slug}
      style={category ? { ["--accent" as string]: category.color } : undefined}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <article className="article">
        <div className="article-meta">
          {category && (
            <Link href={`/${category.slug}`} style={{ color: category.color }}>
              {category.labelEn}
            </Link>
          )}
          {series && category && (
            <Link
              href={`/${category.slug}/${series.slug}`}
              className="series-tag"
            >
              {series.labelEn}
            </Link>
          )}
          <span>{formatDate(article.publishedAt)}</span>
        </div>

        <h1>{article.title}</h1>
        {article.lead && <p className="article-lead">{article.lead}</p>}

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {article.artists.length > 0 && (
          <>
            <div className="eyebrow" style={{ marginTop: 34 }}>
              登場アーティスト
            </div>
            <div className="tag-row">
              {article.artists.map((s) => {
                const artist = getArtist(s);
                return (
                  <Link key={s} href={`/artists/${s}`} className="tag">
                    {artist?.name ?? s}
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {article.sources.length > 0 && (
          <div className="sources">
            <h2>参照元</h2>
            <ul>
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
}
