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
import { getSeriesPosition } from "@/lib/series-nav";
import SeriesBar from "@/components/SeriesBar";
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
  const position = series ? getSeriesPosition(article) : undefined;
  const html = renderMarkdown(article.body);

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
        {/* 連載記事だけが持つ帯。単発記事ではカテゴリのラベルだけで始まる。 */}
        {series && category && (
          <SeriesBar
            article={article}
            series={series}
            categorySlug={category.slug}
          />
        )}

        <div className="article-meta">
          {category && (
            <Link href={`/${category.slug}`} style={{ color: category.color }}>
              {category.label}
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

        {/* 記事末尾の前後送り。上部の帯と役割が重なるが、
            読み終えた位置で次に進めることのほうが導線として効く。 */}
        {position && (position.prev || position.next) && (
          <div className="series-ends">
            {position.prev ? (
              <Link href={`/articles/${position.prev.slug}`} className="end">
                <span className="dir">← 前の回</span>
                <p>{position.prev.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {position.next && (
              <Link
                href={`/articles/${position.next.slug}`}
                className="end align-end"
              >
                <span className="dir">次の回 →</span>
                <p>{position.next.title}</p>
              </Link>
            )}
          </div>
        )}
      </article>
    </div>
  );
}
