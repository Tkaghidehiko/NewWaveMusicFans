export const metadata = { title: "お問い合わせ" };

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
        </p>
        <div className="note">
          連絡先の記載は未設定です。公開前に、問い合わせ用のメールアドレスまたはフォームを設置してください。
        </div>
      </div>
    </div>
  );
}
