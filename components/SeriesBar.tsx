import Link from "next/link";
import type { Article } from "@/lib/articles";
import type { Series } from "@/lib/series";
import { getSeriesPosition } from "@/lib/series-nav";

/**
 * 連載記事の上部に出す帯。連載名 / 何本目・全何本 / 前後送り の3要素を持つ。
 *
 * **単発記事では出さないこと。** 連載であることがこの帯の唯一の役割で、
 * 全記事に出すと意味が消える。連載が1本しかない場合も出さない
 * （getSeriesPosition が undefined を返すので、そのまま null になる）。
 */
export default function SeriesBar({
  article,
  series,
  categorySlug,
}: {
  article: Article;
  series: Series;
  categorySlug: string;
}) {
  const pos = getSeriesPosition(article);
  if (!pos) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="series-bar">
      <span className="kicker">連載</span>
      <Link href={`/${categorySlug}/${series.slug}`} className="name">
        {series.label}
      </Link>
      <span className="count">
        {pad(pos.index)} / {pad(pos.total)}
      </span>
      {pos.prev ? (
        <Link href={`/articles/${pos.prev.slug}`} className="nav-prev">
          ← 前
        </Link>
      ) : (
        <span className="nav-prev" style={{ opacity: 0.45 }}>
          ← 前
        </span>
      )}
      {pos.next ? (
        <Link href={`/articles/${pos.next.slug}`} className="nav-next">
          次 →
        </Link>
      ) : (
        <span className="nav-next" style={{ opacity: 0.45 }}>
          次 →
        </span>
      )}
    </div>
  );
}
