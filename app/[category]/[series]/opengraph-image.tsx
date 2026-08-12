import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { getCategory } from "@/lib/categories";
import { seriesList, getSeries } from "@/lib/series";

export const alt = "NewWaveMusicFans";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return seriesList.map((s) => ({ category: s.category, series: s.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; series: string }>;
}) {
  const { category, series } = await params;
  const found = getSeries(category, series);
  const parent = getCategory(category);

  // 連載名は日本語のため画像に描画できない（lib/og.tsx 参照）。
  // 画像には英字表記の連載名を出し、日本語名は og:title に任せる。
  return renderOgImage({
    eyebrow: (parent?.label ?? "NewWaveMusicFans").replace("→", "to"),
    title: found?.labelEn ?? "NewWaveMusicFans",
    accent: parent?.color ?? "#3f6f65",
  });
}
