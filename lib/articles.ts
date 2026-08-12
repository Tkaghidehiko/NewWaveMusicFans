import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { CategorySlug } from "./categories";

export type Article = {
  slug: string;
  title: string;
  lead: string;
  category: CategorySlug;
  /** サブカテゴリ（連載）の slug。単発記事は未設定 */
  series?: string;
  publishedAt: string;
  /** 記事に登場するアーティストの slug。アーティストブックの土台になる紐付け */
  artists: string[];
  /** 参照元。著作権対応として全記事に必須 */
  sources: { title: string; url: string }[];
  body: string;
};

const articlesDir = path.join(process.cwd(), "content", "articles");

/**
 * YAML は `2026-08-03` を Date として解釈するため、常に YYYY-MM-DD の文字列に揃える。
 */
function toDateString(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return typeof value === "string" ? value : "";
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDir)) return [];

  return fs
    .readdirSync(articlesDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(articlesDir, file), "utf8");
      const { data, content } = matter(raw);

      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? "(no title)",
        lead: data.lead ?? "",
        category: data.category as CategorySlug,
        series: data.series ?? undefined,
        publishedAt: toDateString(data.publishedAt),
        artists: data.artists ?? [],
        sources: data.sources ?? [],
        body: content,
      };
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticlesByArtist(artistSlug: string): Article[] {
  return getAllArticles().filter((a) => a.artists.includes(artistSlug));
}

export function getArticlesBySeries(
  category: string,
  series: string
): Article[] {
  return getAllArticles().filter(
    (a) => a.category === category && a.series === series
  );
}

export function renderMarkdown(body: string): string {
  return marked.parse(body, { async: false }) as string;
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}
