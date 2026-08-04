import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container inner">
        <Link href="/" className="logo">
          <span className="logo-mark">≋</span>
          <span>NewWaveMusicFans</span>
        </Link>
        <nav className="nav">
          {categories.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`}>
              {c.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
