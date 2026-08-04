export type CategorySlug =
  | "next-wave"
  | "global-trends"
  | "j-to-world"
  | "world-to-j"
  | "wave";

/**
 * カテゴリには2種類ある。
 *
 * - `domain` … **どこの音楽か**（空間の軸）。サイトの4本柱。
 * - `axis`   … **いつの音楽か**（時間の軸）。4本柱を横断して現在地を示す。
 *
 * Wave を5つ目の柱にしなかったのは、他の4つと並べると軸が混ざるため。
 * 「海外の流行」と「今がどの波か」は排他ではなく、後者が前者を含む。
 */
export type CategoryKind = "domain" | "axis";

export type Category = {
  slug: CategorySlug;
  kind: CategoryKind;
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
    kind: "domain",
    label: "Next Wave",
    labelEn: "NEXT WAVE",
    description: "ブレイク前夜の新人",
    color: "#ffd166",
    gradient: "linear-gradient(135deg, #4d3f1a, #131c30)",
  },
  {
    slug: "global-trends",
    kind: "domain",
    label: "Global Trends",
    labelEn: "GLOBAL TRENDS",
    description: "海外の新しい流行",
    color: "#ffa845",
    gradient: "linear-gradient(135deg, #543718, #131c30)",
  },
  {
    slug: "j-to-world",
    kind: "domain",
    label: "J → World",
    labelEn: "J → WORLD",
    description: "世界が注目する日本勢",
    color: "#ff8a50",
    gradient: "linear-gradient(135deg, #55301c, #131c30)",
  },
  {
    slug: "world-to-j",
    kind: "domain",
    label: "World → J",
    labelEn: "WORLD → J",
    description: "日本が注目する海外勢",
    color: "#ff7ba0",
    gradient: "linear-gradient(135deg, #4f2338, #131c30)",
  },
  {
    slug: "wave",
    kind: "axis",
    label: "Wave",
    labelEn: "WAVE",
    description: "いまどの波の上にあるか",
    // 4本柱が暖色なのに対し、ここだけ寒色にしている。
    // 「並列の5つ目」ではなく「軸が違う」ことを色で示すための意図的な逸脱。
    color: "#7ecfc7",
    gradient: "linear-gradient(135deg, #17403d, #131c30)",
  },
];

/** サイトの4本柱。トップの一覧やヘッダーの並びに使う */
export const domainCategories = categories.filter((c) => c.kind === "domain");

/** 時間軸のセクション。4本柱とは別枠で扱う */
export const axisCategories = categories.filter((c) => c.kind === "axis");

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
