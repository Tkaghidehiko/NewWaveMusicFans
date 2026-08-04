import type { CategorySlug } from "./categories";

/**
 * サブカテゴリ（連載）。
 *
 * カテゴリが「何について書くか」なのに対し、サブカテゴリは「どう書くか」を表す。
 * 同じ Next Wave でも、予想を検証する記事と1組を掘る記事では読み方が違うため、
 * 読者が形式で選べるようにしている。
 *
 * 記事のフロントマターの `series` に slug を書くと紐づく。未記入でも記事は成立する
 * （どの連載にも属さない単発記事を許容する）。
 */
export type Series = {
  slug: string;
  /** 所属する親カテゴリ。他カテゴリにも連載を作れるようこの形にしている */
  category: CategorySlug;
  label: string;
  labelEn: string;
  /** 一覧に出る1行説明 */
  description: string;
  /** 連載ページの導入文。なぜこの連載があるのかを書く */
  intro: string;
};

export const seriesList: Series[] = [
  {
    slug: "check-in",
    category: "next-wave",
    label: "答え合わせ",
    labelEn: "CHECK-IN",
    description: "あの予想は当たったのか",
    intro:
      "年始に発表される「今年来る」リストは数多くありますが、その後どうなったかを振り返る記事はほとんどありません。この連載では、時間が経ったあとに戻ってきて、実際に何が起きたのかを確かめます。",
  },
  {
    slug: "before-japan",
    category: "next-wave",
    label: "上陸前",
    labelEn: "BEFORE JAPAN",
    description: "日本で観られるようになる前に",
    intro:
      "海外で評価が固まったアーティストが日本のフェスに並ぶまでには、時間差があります。この連載では、その時間差の内側にいる — つまり、まだ日本で観る機会がないアーティストを扱います。",
  },
  {
    slug: "deep-dive",
    category: "next-wave",
    label: "深掘り",
    labelEn: "DEEP DIVE",
    description: "1組をじっくり掘る",
    intro:
      "リスト記事では1組あたり数行しか割けません。この連載では対象を1組に絞り、経歴・音楽性・これから起きそうなことまでを掘り下げます。",
  },
];

export function getSeriesByCategory(category: string): Series[] {
  return seriesList.filter((s) => s.category === category);
}

export function getSeries(
  category: string,
  slug: string
): Series | undefined {
  return seriesList.find((s) => s.category === category && s.slug === slug);
}

/** 記事に紐づく連載を引く。カテゴリをまたいだ取り違えを防ぐため両方で照合する */
export function getSeriesForArticle(
  category: string,
  seriesSlug: string | undefined
): Series | undefined {
  if (!seriesSlug) return undefined;
  return getSeries(category, seriesSlug);
}
