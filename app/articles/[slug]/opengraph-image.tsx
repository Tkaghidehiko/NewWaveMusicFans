import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { getAllArticles, getArticle } from "@/lib/articles";
import { getCategory } from "@/lib/categories";

export const alt = "NewWaveMusicFans";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  const category = article ? getCategory(article.category) : undefined;

  // 記事タイトルは日本語なので画像には載せられない（lib/og.tsx 参照）。
  // 画像はカテゴリのブランディングに徹し、日本語タイトルは og:title に任せる。
  return renderOgImage({
    eyebrow: "Article",
    title: (category?.label ?? "NewWaveMusicFans").replace("→", "to"),
    accent: category?.color ?? "#ffd166",
  });
}
