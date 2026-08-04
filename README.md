# NewWaveMusicFans

最新の音楽情報を、海外の一次情報も踏まえて日本語でまとめる音楽メディア。
「AIによる高速な情報収集 × 運営者の編集方針でのブラッシュアップ」がコアの編集体制。

## ステータス

- Phase 0: 設計・計画 ✅（[docs/DESIGN.md](docs/DESIGN.md)）
- Phase 1: MVP構築 ✅（4カテゴリ・記事・アーティストページ）
- Phase 2: リリース ← 今ここ（SEO設定 ✅ / デプロイ・ドメイン・分析は未）
- Phase 3: 編集パイプライン（予定）
- Phase 4: 分析・改善運営（予定）

⚠️ 記事は**すべてサンプル**（架空のアーティスト）です。公開前に差し替えてください。

## 開発

```
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド
```

環境変数は [.env.example](.env.example) を参照してください。
ドメイン確定までは `NEXT_PUBLIC_ALLOW_INDEXING=false` でクロールを止められます。

## ドキュメント

- [設計・計画ドキュメント](docs/DESIGN.md)
- [ユーザー機能の仕様（ドラフト）](docs/FEATURES-USER.md)
- [記事・アーティストデータの書き方](content/README.md)

## 外出先からの作業について

このリポジトリをGitHubに置くことで、スマホの **claude.ai/code** から
同じプロジェクトを開いて記事のブラッシュアップや指示出しができます。

```
PCで編集 → git push → スマホ(claude.ai/code)で続き → git push → PCで pull
```
