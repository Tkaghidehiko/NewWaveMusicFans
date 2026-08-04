export const metadata = {
  title: "サイトについて",
  description: "NewWaveMusicFans の編集方針と、記事のつくり方について。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container">
      <div className="page-head">
        <span className="eyebrow">About</span>
        <h1>サイトについて</h1>
      </div>

      <div className="prose">
        <p>
          NewWaveMusicFans
          は、これから世界を動かすであろう次世代のアーティストと、日本と海外が互いに注目し合う動きを追う音楽メディアです。
        </p>

        <h2>4つのカテゴリ</h2>
        <ul>
          <li>
            <strong>Next Wave</strong> — 次世代を担う、ブレイク前夜のアーティスト
          </li>
          <li>
            <strong>Global Trends</strong> — 海外で生まれている新しい流行
          </li>
          <li>
            <strong>J → World</strong> — 世界が注目する日本のアーティスト
          </li>
          <li>
            <strong>World → J</strong> — 日本が注目する海外のアーティスト
          </li>
        </ul>

        <h2>編集方針</h2>
        <p>
          記事の制作にあたっては、海外メディアの報道や公式発表などの情報をAIを活用して収集・整理し、
          そのうえで編集者が切り口を決め、自らの言葉で執筆・加筆しています。
          収集した情報をそのまま転載・翻訳して掲載することはありません。
        </p>
        <p>
          参照した情報源は各記事の末尾に明記しています。
          事実関係については一次情報での確認を基本としていますが、
          誤りにお気づきの際はお問い合わせよりご連絡ください。
        </p>

        <h2>これから追加予定の機能</h2>
        <ul>
          <li>ユーザー登録と、好きなアーティストの記録</li>
          <li>いいねした記事が貯まっていくアーティストブック</li>
          <li>マヤ暦ツォルキンによるアーティストとの相性診断</li>
        </ul>
      </div>
    </div>
  );
}
