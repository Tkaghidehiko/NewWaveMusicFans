import { renderOgImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "NewWaveMusicFans — 次世代の音楽と、日本と世界のあいだ";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Music Media",
    title: "Next-wave artists,\nJapan and the world.",
    accent: "#3f6f65",
  });
}
