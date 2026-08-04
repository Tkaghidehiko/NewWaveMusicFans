import fs from "node:fs";
import path from "node:path";

/**
 * アーティストとメンバーのデータ。
 *
 * メンバーの birthdate は「公表されている情報のみ」を扱う。
 * 将来のマヤ暦相性診断ではこの値から KIN を算出するため、
 * 不明な場合は null のままにしておくこと（推測で埋めない）。
 */
export type Member = {
  name: string;
  role: string;
  birthdate: string | null;
};

export type Artist = {
  slug: string;
  name: string;
  nameJa?: string;
  country: string;
  genre: string;
  bio: string;
  members: Member[];
};

const artistsDir = path.join(process.cwd(), "content", "artists");

export function getAllArtists(): Artist[] {
  if (!fs.existsSync(artistsDir)) return [];

  return fs
    .readdirSync(artistsDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(artistsDir, f), "utf8");
      return JSON.parse(raw) as Artist;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getArtist(slug: string): Artist | undefined {
  return getAllArtists().find((a) => a.slug === slug);
}
