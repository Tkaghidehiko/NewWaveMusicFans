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
    gradient: "linear-gradient(135deg, #4d3f1a, #131c30)",
  },
  {
    slug: "global-trends",
    label: "Global Trends",
    labelEn: "GLOBAL TRENDS",
    description: "海外の新しい流行",
    color: "#ffa845",
    gradient: "linear-gradient(135deg, #543718, #131c30)",
  },
  {
    slug: "j-to-world",
    label: "J → World",
    labelEn: "J → WORLD",
    description: "世界が注目する日本人",
    color: "#ff8a50",
    gradient: "linear-gradient(135deg, #55301c, #131c30)",
  },
  {
    slug: "world-to-j",
    label: "World → J",
    labelEn: "WORLD → J",
    description: "日本が注目する海外勢",
    color: "#ff7ba0",
    gradient: "linear-gradient(135deg, #4f2338, #131c30)",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
