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
 */
export type CategoryKind = "domain" | "axis";

export type Category = {
  slug: CategorySlug;
  kind: CategoryKind;
  label: string;
  labelEn: string;
  description: string;
  /** 文字・ボタン地に使う濃いトーン。白抜き文字で AA を満たす */
  color: string;
  /** 面・アイコン地に使う淡いパステル。文字色には使わないこと */
  tint: string;
  /** カード上部のサムネイル代替グラデーション */
  gradient: string;
};

/* ⚠️ color と tint を取り違えないこと。
   淡い tint の上に白文字を載せると 2:1 台まで落ちる（実測）。
   白抜き文字を置く面は必ず color 側を使う。

   ⚠️ color は2通りの使われ方をする。両方で 4.5:1 を満たす必要がある。
     ① 面として … 白抜き文字を載せる（.btn-primary、現在地のナビ）
     ② 文字として … 紙 #f7f4fb の上に直接置く（.eyebrow、本文中のリンク）
   ② のほうが条件が厳しい。next-wave は当初 #b55c42 で ① 4.59 / ② 4.22 となり、
   文字として使ったときだけ基準を割っていた（実測）。#ab5339 で ① 5.21 / ② 4.79。 */
export const categories: Category[] = [
  {
    slug: "next-wave",
    kind: "domain",
    label: "Next Wave",
    labelEn: "NEXT WAVE",
    description: "ブレイク前夜の新人",
    color: "#ab5339",
    tint: "#e8927c",
    gradient: "linear-gradient(150deg, #f7ece7, #eee9f6)",
  },
  {
    slug: "global-trends",
    kind: "domain",
    label: "Global Trends",
    labelEn: "GLOBAL TRENDS",
    description: "海外の新しい流行",
    color: "#8a6a1c",
    tint: "#d9b168",
    gradient: "linear-gradient(150deg, #f7f0e2, #eee9f6)",
  },
  {
    slug: "j-to-world",
    kind: "domain",
    label: "J → World",
    labelEn: "J → WORLD",
    description: "世界が注目する日本勢",
    color: "#4a5cb0",
    tint: "#8a9ede",
    gradient: "linear-gradient(150deg, #e9ecf9, #eee9f6)",
  },
  {
    slug: "world-to-j",
    kind: "domain",
    label: "World → J",
    labelEn: "WORLD → J",
    description: "日本が注目する海外勢",
    color: "#a4436c",
    tint: "#dd93b4",
    gradient: "linear-gradient(150deg, #f9eaf1, #eee9f6)",
  },
  {
    slug: "wave",
    kind: "axis",
    label: "Wave",
    labelEn: "WAVE",
    description: "いまどの波の上にあるか",
    // 4本柱と軸が違うことを色で示す。ここだけ緑青。
    color: "#3f6f65",
    tint: "#7cc0b2",
    gradient: "linear-gradient(150deg, #e4f1ed, #eee9f6)",
  },
];

/** サイトの4本柱。トップの一覧やヘッダーの並びに使う */
export const domainCategories = categories.filter((c) => c.kind === "domain");

/** 時間軸のセクション。4本柱とは別枠で扱う */
export const axisCategories = categories.filter((c) => c.kind === "axis");

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
