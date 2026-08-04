import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { getAllArtists } from "@/lib/artists";
import { categories } from "@/lib/categories";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  /** 記事の最終更新日。サイト全体の「鮮度」として最新記事の日付を使う。 */
  const latestArticleDate = articles[0]?.publishedAt
    ? new Date(articles[0].publishedAt)
    : undefined;

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: latestArticleDate, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: absoluteUrl(`/${c.slug}`),
    lastModified: latestArticleDate,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: absoluteUrl(`/articles/${a.slug}`),
    lastModified: a.publishedAt ? new Date(a.publishedAt) : undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const artistPages: MetadataRoute.Sitemap = getAllArtists().map((a) => ({
    url: absoluteUrl(`/artists/${a.slug}`),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...articlePages, ...artistPages];
}
