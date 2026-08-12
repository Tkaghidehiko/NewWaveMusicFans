import type { Metadata } from "next";
import { Zen_Maru_Gothic, Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  siteUrl,
  siteName,
  siteTagline,
  siteDescription,
  isIndexable,
} from "@/lib/site";
import "./globals.css";

/* chill テーマの土台は丸ゴシック。Archivo はロゴの "music fans" だけに使う。
   globals.css 側は "Zen Maru Gothic" / "Archivo" をファミリー名で直接指定しているため、
   ここでは変数を渡すのではなく、next/font が挿入する @font-face を効かせる目的で読み込む。 */
const zenMaru = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-zen-maru",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  // 各ページの相対URL（canonical・OGP画像）を絶対URLへ解決するための基準
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${siteTagline}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName,
    title: `${siteName} — ${siteTagline}`,
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — ${siteTagline}`,
    description: siteDescription,
  },
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${zenMaru.variable} ${archivo.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* アクセス解析。Cookieを使わず個人を特定しない集計のみを行う。
            計測内容はプライバシーポリシーに記載しているため、変更時は同ページも更新すること。 */}
        <Analytics />
      </body>
    </html>
  );
}
