/**
 * サイト全体の基本情報。
 *
 * 公開URLはドメイン確定前でも動くよう、環境変数から段階的に解決する。
 *   1. NEXT_PUBLIC_SITE_URL      独自ドメインが決まったらこれを設定する（最優先）
 *   2. VERCEL_PROJECT_PRODUCTION_URL  Vercel が自動で入れる本番URL（設定なしでも動く）
 *   3. localhost                 ローカル開発時
 *
 * sitemap・robots・OGPの絶対URLはすべてここを参照するため、
 * ドメイン変更時に書き換えるのはこのファイルだけで済む。
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const siteName = "NewWaveMusicFans";

export const siteTagline = "次世代の音楽と、日本と世界のあいだ";

export const siteDescription =
  "ブレイク前夜の次世代アーティスト、海外で生まれている新しい流行、そして日本と世界が互いに注目し合う動きを追う音楽メディア。";

/** 検索エンジンにインデックスさせてよいか。本番ドメインが確定するまでは無効にできる。 */
export const isIndexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * 構造化データを <script> に埋め込める文字列にする。
 *
 * 記事タイトルや bio に `</script>` が含まれるとタグを抜け出せてしまうため、
 * `<` をエスケープしてから埋め込む。
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * ページ用の openGraph / twitter を組み立てる。
 *
 * Next.js の metadata は openGraph をページ単位で「置換」するため、
 * ルートレイアウトに書いた siteName・locale は子ページに引き継がれない。
 * 取りこぼしを防ぐため、各ページはこのヘルパー経由で組み立てる。
 */
export function buildSocialMetadata(opts: {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  section?: string;
}) {
  const { title, description, url, type = "website", publishedTime, section } = opts;

  return {
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "ja_JP",
      siteName,
      title,
      description,
      url,
      ...(type === "article" ? { publishedTime, section } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
    },
  };
}
