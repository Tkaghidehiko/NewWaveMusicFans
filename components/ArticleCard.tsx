import Link from "next/link";
import type { Article } from "@/lib/articles";
import { formatDate } from "@/lib/articles";
import { getCategory } from "@/lib/categories";

export default function ArticleCard({ article }: { article: Article }) {
  const category = getCategory(article.category);

  return (
    <Link href={`/articles/${article.slug}`} className="card">
      {/* サムネイルは淡いグラデーション。♪ の絵文字は置かず、面だけで持たせる。
          アートワーク画像が入ったら、この div を img に差し替える。 */}
      <div
        className="card-thumb"
        style={{ background: category?.gradient }}
      />
      <div className="card-body">
        {/* labelEn は全角の詰まった大文字になりがちなので、chill では日本語ラベルを使う */}
        <span className="card-cat" style={{ color: category?.color }}>
          {category?.label}
        </span>
        <p className="card-title">{article.title}</p>
        <p className="card-date">{formatDate(article.publishedAt)}</p>
      </div>
    </Link>
  );
}
