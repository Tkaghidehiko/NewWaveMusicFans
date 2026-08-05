import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getAllArtists, getArtist } from "@/lib/artists";
import { getArticlesByArtist } from "@/lib/articles";
import { getCategory } from "@/lib/categories";
import { absoluteUrl, buildSocialMetadata, jsonLdScript } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArtists().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) return {};

  const title = artist.nameJa ? `${artist.name}（${artist.nameJa}）` : artist.name;
  return {
    title,
    description: artist.bio,
    ...buildSocialMetadata({
      title,
      description: artist.bio,
      url: `/artists/${slug}`,
      type: "profile",
    }),
  };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();

  const articles = getArticlesByArtist(slug);

  /* このアーティストがどのカテゴリで扱われているか。
     記事から逆算するので、データを二重に持たずに済む。
     記事が0本のアーティストではタグが出ないが、それが正しい状態
     （まだどの文脈にも置かれていない）。 */
  const categories = Array.from(new Set(articles.map((a) => a.category)))
    .map((c) => getCategory(c))
    .filter((c) => c !== undefined);

  const primary = categories[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    alternateName: artist.nameJa,
    description: artist.bio,
    genre: artist.genre,
    url: absoluteUrl(`/artists/${slug}`),
    image: absoluteUrl(`/artists/${slug}/opengraph-image`),
    member: artist.members.map((m) => ({
      "@type": "Person",
      name: m.name,
      roleName: m.role,
    })),
  };

  return (
    <div
      className="container"
      data-category={primary?.slug}
      style={primary ? { ["--accent" as string]: primary.color } : undefined}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      <div className="artist-head">
        {/* アーティスト写真が入るまでは淡いグラデーションの面で持たせる。
            画像が用意できたら、この div を img に差し替える。 */}
        <div
          className="artist-photo"
          style={{ background: primary?.gradient }}
        />
        <div>
          <span className="eyebrow">
            {artist.country} ・ {artist.genre}
          </span>
          <h1>{artist.name}</h1>
          {artist.nameJa && <p className="name-ja">{artist.nameJa}</p>}
          <p className="bio">{artist.bio}</p>

          <div className="tag-row" style={{ margin: "18px 0 0" }}>
            <span className="tag">{artist.country}</span>
            <span className="tag">{artist.genre}</span>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="tag"
                style={{ color: c.color, borderColor: c.color }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat">
          <div className="label">記事</div>
          <div className="value">{String(articles.length).padStart(2, "0")}</div>
        </div>
        <div className="stat">
          <div className="label">メンバー</div>
          <div className="value">
            {artist.members.length > 0
              ? String(artist.members.length).padStart(2, "0")
              : "—"}
          </div>
        </div>
        <div className="stat">
          <div className="label">主なカテゴリ</div>
          <div className="value" style={{ fontSize: 18, color: primary?.color }}>
            {primary?.label ?? "—"}
          </div>
        </div>
      </div>

      {artist.members.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>メンバー</h2>
          </div>
          <div className="member-grid">
            {artist.members.map((m) => (
              <div key={m.name} className="member">
                <p className="name">{m.name}</p>
                <p className="role">
                  {m.role}
                  {" ・ "}
                  {m.birthdate ? m.birthdate : "生年月日 非公開"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-head">
          <h2>関連記事</h2>
        </div>
        {articles.length > 0 ? (
          <div className="card-grid">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <p className="empty">関連記事はまだありません。</p>
        )}
      </section>

      <div className="note">
        今後この場所に「ファンになる」ボタンとマヤ暦の相性診断が入ります。
        生年月日が公表されているメンバーのみ相性を表示します。
      </div>
    </div>
  );
}
