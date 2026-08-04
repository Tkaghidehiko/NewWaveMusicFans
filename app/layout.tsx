import type { Metadata } from "next";
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
    <html lang="ja">
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
