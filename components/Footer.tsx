import Link from "next/link";
import { domainCategories } from "@/lib/categories";
import { Logo } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <div>
            <Logo />
            <p style={{ margin: "14px 0 0", maxWidth: 380, lineHeight: 2 }}>
              最新の音楽情報を、海外の一次情報も踏まえて日本語でまとめています。
            </p>
          </div>
          <div style={{ display: "flex", gap: 40 }}>
            <div>
              <div className="col-head">カテゴリ</div>
              <div className="links">
                {domainCategories.map((c) => (
                  <Link key={c.slug} href={`/${c.slug}`}>
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="col-head">その他</div>
              <div className="links">
                <Link href="/wave">Wave — 定点観測</Link>
                <Link href="/about">サイトについて</Link>
                <Link href="/contact">お問い合わせ</Link>
                <Link href="/privacy">プライバシーポリシー</Link>
                <Link href="/terms">利用規約</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <span>© 2026 NewWaveMusicFans</span>
          <span>編集体制：AIによる収集 ＋ 運営者の編集</span>
        </div>
      </div>
    </footer>
  );
}
