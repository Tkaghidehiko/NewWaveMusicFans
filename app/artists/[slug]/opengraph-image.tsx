import { renderOgImage, ogSize, ogContentType } from "@/lib/og";
import { getAllArtists, getArtist } from "@/lib/artists";

export const alt = "NewWaveMusicFans";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllArtists().map((a) => ({ slug: a.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = getArtist(slug);

  // artist.name はラテン文字表記で統一している（日本語名は nameJa 側）。
  // そのため名前をそのまま画像に描画できる。content/README.md 参照。
  return renderOgImage({
    eyebrow: "Artist",
    title: artist?.name ?? "NewWaveMusicFans",
    accent: "#3f6f65",
  });
}
