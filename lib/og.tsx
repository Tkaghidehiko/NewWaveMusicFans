import { ImageResponse } from "next/og";
import { siteName } from "./site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgOptions = {
  /** 上部の小さいラベル。カテゴリ名など */
  eyebrow: string;
  /** 中央の主題 */
  title: string;
  /** カテゴリのアクセントカラー */
  accent: string;
};

/**
 * OGP画像を生成する。
 *
 * ⚠️ 描画に使えるのは next/og 同梱の欧文フォントのみで、日本語は豆腐になる。
 * そのため画像に載せる文字は英字表記に限定し、日本語のタイトルは
 * og:title（テキストとしてSNS側が表示する）に任せている。
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
          backgroundColor: "#080b13",
          backgroundImage:
            "linear-gradient(135deg, #07080d 0%, #0b1120 30%, #122038 55%, #1b2e52 78%, #24406e 100%)",
          fontFamily: "sans-serif",
          color: "#f7efe4",
        }}
      >
        {/* ヘッダー: ロゴマーク + サイト名 */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage:
                "linear-gradient(135deg, #ffd166, #e8763a 60%, #e0728c)",
              color: "#07080d",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>
            {siteName}
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
              letterSpacing: -2,
              /* title 内の改行をそのまま反映させる */
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
        </div>

        {/* 下部のアクセントバー */}
        <div style={{ display: "flex", height: 10, borderRadius: 5 }}>
          <div style={{ flex: 1, backgroundColor: accent, borderRadius: 5 }} />
          <div style={{ flex: 2 }} />
        </div>
      </div>
    ),
    ogSize
  );
}
