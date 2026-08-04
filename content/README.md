# content — 記事とアーティストのデータ

ここに入っているのはすべて**実在のアーティストに基づく実データ**です。
架空のデータ・仮のデータは置かないでください（構造を試したい場合もローカルで確認し、コミットしない）。

## articles/*.md

Markdown の先頭にフロントマターを書きます。

```yaml
---
title: 記事タイトル
lead: 一覧やトップに表示される要約文
category: next-wave        # next-wave / global-trends / j-to-world / world-to-j
series: check-in           # サブカテゴリ（連載）。任意。lib/series.ts 参照
publishedAt: 2026-08-04    # YYYY-MM-DD
artists:                   # 登場アーティストの slug（アーティストブックの土台）
  - wren-halloway
sources:                   # 参照元（著作権対応のため必須）
  - title: 参照元の記事名・媒体名
    url: https://example.com/...
---
```

### サブカテゴリ（連載）

`series` に連載の slug を書くと、`/[カテゴリ]/[連載]` の一覧に載ります。省略すれば単発記事です。
連載の定義は `lib/series.ts` にあります。現在 Next Wave に3つ:

| slug | 連載名 | 扱うもの |
|---|---|---|
| `check-in` | 答え合わせ | 過去の予想・リストを時間を置いて検証する |
| `before-japan` | 上陸前 | 日本でまだ観る機会のないアーティスト |
| `deep-dive` | 深掘り | 1組に絞って掘り下げる |

`series` は親カテゴリと組み合わせて照合されるため、`category` と食い違う slug を書くと
連載として認識されません（誤ったカテゴリへの混入を防ぐための仕様です）。

### 執筆時のルール
- 参照元の文章をそのまま転載・翻訳しない。必ず自分の言葉で書く
- 歌詞は掲載しない
- `sources` は必ず記入する
- `artists` を書き忘れると、その記事はアーティストブックに紐づかない

## artists/*.json

```json
{
  "slug": "wren-halloway",
  "name": "Wren Halloway",
  "nameJa": "レン・ハロウェイ",
  "country": "イギリス",
  "genre": "Indie Folk",
  "bio": "紹介文",
  "members": [
    { "name": "Wren Halloway", "role": "Vo, Gt", "birthdate": null }
  ]
}
```

`birthdate` は **公表されている情報のみ** を入れます。不明な場合は `null` のままにしてください
（マヤ暦の相性診断で使用しますが、推測で埋めてはいけません）。

⚠️ **`name` はラテン文字表記で書いてください。** 日本語名・カタカナ名は `nameJa`（任意）に入れます。
OGP画像の生成に使っている `next/og` には欧文フォントしか入っておらず、
`name` に日本語を入れるとSNSシェア画像で豆腐（□）になります。
日本語のアーティスト名はページのタイトルタグ側で表示されるため、表示上の不利はありません。
