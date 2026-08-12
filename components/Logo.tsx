import Link from "next/link";

/** ロゴの波形マーク。細線・インク1色。色は親の currentColor を継ぐ。 */
export function WaveMark({
  width = 30,
  height = 18,
  strokeWidth = 1.7,
}: {
  width?: number;
  height?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 18"
      aria-hidden="true"
      className="logo-mark"
      style={{ width, height }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      >
        <path d="M1 6.6c2.6-4 5.2-4 7.8 0s5.2 4 7.8 0 5.2-4 6.4-1.6" />
        <path d="M1 12.6c2.6-4 5.2-4 7.8 0s5.2 4 7.8 0 5.2-4 6.4-1.6" />
      </g>
    </svg>
  );
}

/** ヘッダー・フッターで共通に使うロックアップ */
export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="logo">
      <WaveMark />
      <span>NEW WAVE</span>
      <span className="logo-sub">music fans</span>
    </Link>
  );
}
