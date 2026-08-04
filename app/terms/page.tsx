export const metadata = {
  title: "利用規約",
  description: "NewWaveMusicFans の利用規約。",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container">
      <div className="page-head">
        <span className="eyebrow">Terms</span>
        <h1>利用規約</h1>
      </div>

      <div className="prose">
        <div className="note">
          このページは未作成です。ユーザー登録機能を公開する時点で、内容を確定させる必要があります。
        </div>

        <h2>記載が必要な項目</h2>
        <ul>
          <li>サービスの内容</li>
          <li>アカウントの登録と管理、退会について</li>
          <li>禁止事項</li>
          <li>投稿・記録されたデータの取り扱い</li>
          <li>免責事項（マヤ暦診断はエンターテインメントである旨を含む）</li>
          <li>規約の変更について</li>
          <li>準拠法と管轄</li>
        </ul>
      </div>
    </div>
  );
}
