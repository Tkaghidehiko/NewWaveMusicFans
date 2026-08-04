import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // 本番ドメイン確定前やステージング環境では NEXT_PUBLIC_ALLOW_INDEXING=false で
  // クロールを止める。中身が仮の状態でインデックスされるのを防ぐため。
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
