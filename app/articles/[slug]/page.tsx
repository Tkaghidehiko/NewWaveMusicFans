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

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.lead };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const html = renderMarkdown(article.body);

  return (
    <div className="container">
      <article className="article">
        <div className="article-meta">
          {category && (
            <Link href={`/${category.slug}`} style={{ color: category.color }}>
              {category.labelEn}
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
