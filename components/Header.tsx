import Link from "next/link";
import { domainCategories, axisCategories } from "@/lib/categories";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container inner">
        <Link href="/" className="logo">
          <span className="logo-mark">≋</span>
          <span>NewWaveMusicFans</span>
        </Link>
        <nav className="nav">
          {domainCategories.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`}>
              {c.label}
            </Link>
          ))}
          {/* 軸が違うため、4本柱とは区切って置く */}
          {axisCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="nav-axis"
              style={{ ["--accent" as string]: c.color }}
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
