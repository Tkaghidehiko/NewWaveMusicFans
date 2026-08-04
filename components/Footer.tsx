import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="links">
          <Link href="/about">サイトについて</Link>
          <Link href="/contact">お問い合わせ</Link>
          <Link href="/privacy">プライバシーポリシー</Link>
          <Link href="/terms">利用規約</Link>
        </div>
        <div>© 2026 NewWaveMusicFans</div>
      </div>
    </footer>
  );
}
