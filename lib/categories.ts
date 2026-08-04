export type CategorySlug =
  | "next-wave"
  | "global-trends"
  | "j-to-world"
  | "world-to-j";

export type Category = {
  slug: CategorySlug;
  label: string;
  labelEn: string;
  description: string;
  color: string;
  /** カード上部のサムネイル代替グラデーション */
  gradient: string;
};

export const categories: Category[] = [
  {
    slug: "next-wave",
    label: "Next Wave",
    labelEn: "NEXT WAVE",
    description: "次世代アーティスト候補",
    color: "#ffd166",
    gradient: "linear-gradient(135deg, #6b4310, #2a1c10)",
  },
  {
    slug: "global-trends",
    label: "Global Trends",
    labelEn: "GLOBAL TRENDS",
    description: "海外の新しい流行",
    color: "#ffa845",
    gradient: "linear-gradient(135deg, #7a4416, #2a1a10)",
  },
  {
    slug: "j-to-world",
    label: "J → World",
    labelEn: "J → WORLD",
    description: "世界が注目する日本人",
    color: "#ff8a50",
    gradient: "linear-gradient(135deg, #7a3a1e, #2a1610)",
  },
  {
    slug: "world-to-j",
    label: "World → J",
    labelEn: "WORLD → J",
    description: "日本が注目する海外勢",
    color: "#ff7ba0",
    gradient: "linear-gradient(135deg, #7a2942, #2a1218)",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
