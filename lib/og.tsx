import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgOptions = {
  /** 上部の小さいラベル。カテゴリ名など */
  eyebrow: string;
  /** 中央の主題 */
  title: string;
  /** カテゴリのアクセントカラー。categories.ts の color（濃）側を渡すこと。
      tint（淡）を渡すと明るい紙の上で文字が沈む。 */
  accent: string;
};

/**
 * OGP画像を生成する。chill テーマ（薄紫の紙・インク1色のロゴ・低彩度）に合わせている。
 * サイト本体は app/globals.css、ロゴの原本は components/Logo.tsx。
 *
 * ⚠️ 描画に使えるのは next/og 同梱の欧文フォントのみで、日本語は豆腐になる。
 * そのため画像に載せる文字は英字表記に限定し、日本語のタイトルは
 * og:title（テキストとしてSNS側が表示する）に任せている。
 *
 * ⚠️ 背景に body と同じ波柄のSVGパターンは敷いていない。satori の
 * backgroundImage は data URI の繰り返しに対応しておらず、確実に出るのは
 * グラデーションだけのため、hero-card と同じ淡いグラデーションで代用している。
 */
export function renderOgImage({ eyebrow, title, accent }: OgOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#f7f4fb",
          backgroundImage: "linear-gradient(150deg, #efe7f6, #e4eef1)",
          fontFamily: "sans-serif",
          color: "#3a3348",
        }}
      >
        {/* ヘッダー: 波形マーク + ロックアップ（components/Logo.tsx と同じ構成） */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width={90} height={54} viewBox="0 0 30 18">
            <g
              fill="none"
              stroke="#4a4159"
              strokeWidth={1.7}
              strokeLinecap="round"
            >
              <path d="M1 6.6c2.6-4 5.2-4 7.8 0s5.2 4 7.8 0 5.2-4 6.4-1.6" />
              <path d="M1 12.6c2.6-4 5.2-4 7.8 0s5.2 4 7.8 0 5.2-4 6.4-1.6" />
            </g>
          </svg>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
            }}
          >
            <div style={{ fontSize: 40, fontWeight: 600, letterSpacing: 3 }}>
              NEW WAVE
            </div>
            <div
              style={{
                fontSize: 20,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#6b6280",
              }}
            >
              music fans
            </div>
          </div>
        </div>

        {/* 主題 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: -1,
              /* title 内の改行をそのまま反映させる */
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
        </div>

        {/* 下部のアクセントバー。角丸はサイトのカードと同じく大きめに */}
        <div style={{ display: "flex", height: 10, borderRadius: 5 }}>
          <div style={{ flex: 1, backgroundColor: accent, borderRadius: 5 }} />
          <div style={{ flex: 2 }} />
        </div>
      </div>
    ),
    ogSize
  );
}
