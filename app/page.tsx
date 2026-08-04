import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";
import { domainCategories, axisCategories } from "@/lib/categories";

export default function HomePage() {
  const articles = getAllArticles();
  const [featured, ...rest] = articles;

  return (
    <div className="container">
      <section className="hero">
        <span className="hero-badge">◆ THIS WEEK</span>
        {featured ? (
          <Link href={`/articles/${featured.slug}`} className="hero-card">
            <span className="eyebrow" style={{ color: "#ffd166" }}>
              今週の注目
            </span>
            <h1>{featured.title}</h1>
            <p>{featured.lead}</p>
            <div className="hero-actions">
              <span className="btn-primary">記事を読む</span>
              <span className="btn-ghost">カテゴリを見る</span>
            </div>
          </Link>
        ) : (
          <div className="hero-card">
            <h1>記事を準備中です</h1>
          </div>
        )}
      </section>

      <div className="divider" />

      <section className="section">
        <div className="eyebrow" style={{ marginBottom: 18 }}>
          Categories
        </div>
        <div className="category-grid">
          {domainCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="category-item"
              style={{ ["--accent" as string]: c.color }}
            >
              <p className="name">{c.label}</p>
              <p className="desc">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4本柱が「どこの音楽か」なのに対し、Wave は「いつの音楽か」。
          並べると軸が混ざるため、一段下げて別枠で置く。 */}
      {axisCategories.map((c) => (
        <section key={c.slug} className="section" style={{ paddingTop: 0 }}>
          <Link
            href={`/${c.slug}`}
            className="axis-banner"
            style={{ ["--accent" as string]: c.color }}
          >
            <span className="eyebrow" style={{ color: c.color }}>
              {c.labelEn}
            </span>
            <p className="name">{c.description}</p>
            <p className="desc">
              いま注目されているジャンルとアーティストの傾向を追い、
              4つのカテゴリを横断して「現在地」を示す定点観測です。
            </p>
          </Link>
        </section>
      ))}

      <div className="divider" />

      <section className="section">
        <div className="section-head">
          <h2>最新記事</h2>
        </div>
        {rest.length > 0 ? (
          <div className="card-grid">
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <p className="empty">これから記事が追加されます。</p>
        )}
      </section>
    </div>
  );
}
