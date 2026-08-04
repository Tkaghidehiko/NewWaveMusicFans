import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NewWaveMusicFans — 次世代の音楽と、日本と世界のあいだ",
    template: "%s | NewWaveMusicFans",
  },
  description:
    "ブレイク前夜の次世代アーティスト、海外の新しい流行、そして日本と世界が互いに注目し合うアーティストを追う音楽メディア。",
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
      </body>
    </html>
  );
}
