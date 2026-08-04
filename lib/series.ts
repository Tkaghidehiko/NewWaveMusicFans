import type { CategorySlug } from "./categories";

/**
 * サブカテゴリ。カテゴリ内をさらに分ける単位。
 *
 * **分け方の意味は親カテゴリごとに違う。**
 *
 * - Next Wave … **形式**で分ける（どう書くか）。予想の検証と1組の深掘りでは読み方が違うため
 * - Wave      … **圏域**で分ける（どこの波か）。日本と英語圏では波の周期も条件も異なるため
 *
 * 統一した意味を持たせようとすると、どちらかのカテゴリで不自然な分類になる。
 * 「カテゴリ内で読者が選びたい単位」であることだけを共通の条件としている。
 *
 * 記事のフロントマターの `series` に slug を書くと紐づく。未記入でも記事は成立する
 * （どのサブカテゴリにも属さない単発記事を許容する）。
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
    description: "日本で観られるのはいつか",
    intro:
      "海外で評価が固まったアーティストが日本のフェスに並ぶまでには、時間差があります。この連載では、その時間差の内側にいる — つまり、まだ日本で観る機会がないアーティストを扱います。",
  },
  {
    slug: "deep-dive",
    category: "next-wave",
    label: "深掘り",
    labelEn: "DEEP DIVE",
    description: "1組だけをどこまで掘れるか",
    intro:
      "リスト記事では1組あたり数行しか割けません。この連載では対象を1組に絞り、経歴・音楽性・これから起きそうなことまでを掘り下げます。",
  },

  // Wave は圏域で分ける。日本と英語圏では市場の構造も波の周期も違うため、
  // 同じ記事で扱うとどちらの解像度も落ちる。相互にリンクさせて往復させる。
  //
  // 日本側をさらに「外向き（輸出）」と「内向き（内需）」に割っているのは、
  // この2つが別の経済で動いているため。海外に届く曲と国内で売れる曲は一致しない。
  {
    slug: "english",
    category: "wave",
    label: "英語圏の波",
    labelEn: "ENGLISH WORLD",
    description: "英語圏でいま何が動いているか",
    intro:
      "アメリカ・イギリスを中心とする英語圏の動きを、業界のデータをもとに追います。市場が大きいぶん数字が揃いやすく、波の輪郭がはっきり出る側です。",
  },
  {
    slug: "japan",
    category: "wave",
    label: "日本発の波",
    labelEn: "JAPAN OUTBOUND",
    description: "日本の音楽が外へどう出ているか",
    intro:
      "日本の音楽が国境を越えるときに何が起きているかを追います。どの経路で、誰に、どういう形で届いているのか。国内で売れることと海外に届くことは別の条件で決まるため、内需とは分けて扱います。",
  },
  {
    slug: "domestic",
    category: "wave",
    label: "国内需要の波",
    labelEn: "JAPAN DOMESTIC",
    description: "日本のリスナーが何にお金を使っているか",
    intro:
      "日本国内で音楽の需要がどこに向かっているかを追います。海外に届く曲と国内で売れる曲は別の条件で決まるため、日本発の波とは分けて扱います。リスナーが実際にどこにお金を払っているかを、金額で追いかけます。",
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
