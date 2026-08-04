export const metadata = {
  title: "プライバシーポリシー",
  description: "NewWaveMusicFans における個人情報の取り扱いについて。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container">
      <div className="page-head">
        <span className="eyebrow">Privacy</span>
        <h1>プライバシーポリシー</h1>
      </div>

      <div className="prose">
        <div className="note">
          このページは未作成です。ユーザー登録機能を公開する時点で、内容を確定させる必要があります。
        </div>

        <h2>記載が必要な項目</h2>
        <ul>
          <li>取得する情報（メールアドレス、表示名、マヤ暦の算出結果など）</li>
          <li>利用目的</li>
          <li>第三者提供の有無</li>
          <li>アクセス解析ツールの利用について</li>
          <li>保存期間と、退会時のデータ削除について</li>
          <li>開示・訂正・削除請求の窓口</li>
          <li>事業者名と連絡先</li>
        </ul>

        <p>
          内容は個人情報保護法に沿ったものである必要があります。
          公開前に、必要に応じて専門家の確認を受けてください。
        </p>
      </div>
    </div>
  );
}
