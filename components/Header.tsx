"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { domainCategories, axisCategories } from "@/lib/categories";
import { Logo } from "@/components/Logo";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container inner">
        <Logo />
        <nav className="nav">
          {domainCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              aria-current={pathname === `/${c.slug}` ? "page" : undefined}
              style={{ ["--accent" as string]: c.color }}
            >
              {c.label}
            </Link>
          ))}
          {/* 軸が違うため、4本柱とは別扱い。常に薄い緑青の地を持つ */}
          {axisCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="nav-axis"
              aria-current={pathname === `/${c.slug}` ? "page" : undefined}
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
