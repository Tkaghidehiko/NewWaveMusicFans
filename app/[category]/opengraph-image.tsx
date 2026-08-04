import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { categories, getCategory } from "@/lib/categories";

export const alt = "NewWaveMusicFans";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const found = getCategory(category);

  return renderOgImage({
    eyebrow: "Category",
    // 矢印(→)は同梱フォントに無く豆腐になるため、画像内では "to" に置き換える
    title: (found?.label ?? "NewWaveMusicFans").replace("→", "to"),
    accent: found?.color ?? "#ffd166",
  });
}
