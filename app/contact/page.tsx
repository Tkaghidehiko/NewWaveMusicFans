export const metadata = {
  title: "お問い合わせ",
  description: "NewWaveMusicFans へのご連絡・訂正のご依頼について。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container">
      <div className="page-head">
        <span className="eyebrow">Contact</span>
        <h1>お問い合わせ</h1>
      </div>

      <div className="prose">
        <p>
          記事内容に関するご指摘、取材のご依頼、その他のお問い合わせはこちらから承ります。
          事実関係の誤りについては、確認のうえ速やかに対応いたします。
        </p>

        <h2>連絡先</h2>
        <ul>
          <li>運営者名: 【要記入】</li>
          <li>メールアドレス: 【要記入】</li>
        </ul>

        <div className="note">
          <strong>公開前に対応が必要です。</strong>
          【要記入】箇所を埋めてください。この連絡先は
          <a href="/privacy">プライバシーポリシー</a>
          からも参照されているため、開示・削除請求の窓口を兼ねます。
          埋め終わったら、この注意書き自体を削除してください。
        </div>
      </div>
    </div>
  );
}
