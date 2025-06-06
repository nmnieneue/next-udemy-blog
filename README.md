This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## My Portfolio (Next.js)
Next.js/TypeScriptで制作した個人ポートフォリオサイトです。  
認証、DB、バリデーション、CRUD機能などが実装された、  
Markdown形式で記述する簡易ブログサイトとなっています。

## 🔗 デモサイト
[https://your-portfolio-url.vercel.app](https://next-udemy-blog-delta.vercel.app/)

## 📚 参考教材
このアプリは以下のUdemy教材を元に制作しました。一部オリジナル機能を追加しています。

- Udemy講座：「【Next.js】フルスタック開発基本講座(TypeScript/Prisma/Auth)【脱初心者/わかりやすさ重視】」  
  GitHubリポジトリ：https://github.com/aokitashipro/next-udemy-blog  
※デザインや機能の一部をアレンジ・拡張しています。  
※ライセンスの明記がないため、コードの取り扱いにはご注意ください。

## ✨ 主な機能
- Markdown形式に対応した簡易ブログ
- 記事の投稿、検索、編集、削除
- ユーザー登録、ログイン機能
- レスポンシブデザイン対応

## 📝 自身で追加した機能
- 各ページにロゴ(トップページへのリンク)を追加
- 検索窓のレスポンシブ化(スマホ表示下で最小化→クリックで全体表示)
- 記事作成&記事編集時の画像削除機能を追加
- アップロード画像の容量に対しバリデーションを追加(5MB以上の場合、エラーを表示)
- トップページからのログアウト機能を追加  
...ほか細かい修正や機能追加

## 🛠️ 使用技術
- フレームワーク: Next.js v15(App Router) / TypeScript
- スタイリング: Tailwind CSS / shadcn/ui
- 認証: Auth.js
- DB: Prisma / supabase
- バリデーション: zod
- デプロイ: Vercel
- その他: react-markdown / ts-node / bcryptjs / react Icon など

## 🚀 ローカルでの起動方法

1. このリポジトリをクローン
```bash
git clone https://github.com/yum4-k/next-udemy-blog.git
```

2.	ディレクトリに移動
```bash
cd next-udemy-blog
```

3.	パッケージをインストール
```bash
npm install
```

4.	開発サーバーを起動
```bash
npm run dev
```
