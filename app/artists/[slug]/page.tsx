import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getAllArtists, getArtist } from "@/lib/artists";
import { getArticlesByArtist } from "@/lib/articles";
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

  // 構造化データ。メンバーは公表されている情報のみを載せる（生年月日は出さない）。
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
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <div className="page-head">
        <span className="eyebrow">
          {artist.country} ・ {artist.genre}
        </span>
        <h1>{artist.name}</h1>
        <p>{artist.bio}</p>
      </div>

      {artist.members.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <h2>メンバー</h2>
          </div>
          <div className="card-grid">
            {artist.members.map((m) => (
              <div
                key={m.name}
                style={{
                  border: "1px solid var(--border-card)",
                  borderRadius: 12,
                  padding: "13px 15px",
                  background: "var(--surface)",
                }}
              >
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>
                  {m.name}
                </p>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: 12,
                    color: "var(--text-mute)",
                  }}
                >
                  {m.role}
                  {" ・ "}
                  {m.birthdate ? m.birthdate : "生年月日 非公開"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="note">
        今後この場所に「ファンになる」ボタンとマヤ暦の相性診断が入ります。
        生年月日が公表されているメンバーのみ相性を表示します。
      </div>

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
    </div>
  );
}
