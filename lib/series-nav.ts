import { getAllArticles } from "@/lib/articles";
import type { Article } from "@/lib/articles";

export type SeriesPosition = {
  /** 連載内での通し番号（1始まり） */
  index: number;
  total: number;
  prev?: Article;
  next?: Article;
};

/**
 * 記事が連載の何本目かと、前後の記事を返す。
 *
 * 並び順は公開日の**昇順**（第1回が index 1）。記事一覧は新しい順だが、
 * 連載は読む順に番号を振らないと「02 / 06」が意味を持たない。
 *
 * 連載に属さない記事、または連載に1本しかない記事では undefined を返す。
 * 呼び出し側は「返ってきたときだけ連載バーを出す」判定に使える。
 */
export function getSeriesPosition(article: Article): SeriesPosition | undefined {
  if (!article.series) return undefined;

  const siblings = getAllArticles()
    .filter(
      (a) => a.category === article.category && a.series === article.series
    )
    .sort((a, b) => (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""));

  if (siblings.length < 2) return undefined;

  const i = siblings.findIndex((a) => a.slug === article.slug);
  if (i === -1) return undefined;

  return {
    index: i + 1,
    total: siblings.length,
    prev: siblings[i - 1],
    next: siblings[i + 1],
  };
}
