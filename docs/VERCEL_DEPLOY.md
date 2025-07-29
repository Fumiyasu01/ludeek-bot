# Vercelデプロイガイド

## 1. Vercelアカウントの作成

1. [Vercel](https://vercel.com)にアクセス
2. 「Sign Up」→「Continue with GitHub」でログイン

## 2. プロジェクトのインポート

1. ダッシュボードで「Add New...」→「Project」
2. GitHubリポジトリから`ludeek-bot`を選択
3. 「Import」をクリック

## 3. 環境変数の設定

**重要**: デプロイ前に環境変数を設定します

1. 「Environment Variables」セクションで以下を追加：

```
OPENAI_API_KEY = あなたのAPIキー
```

Supabaseを使用する場合は以下も追加：
```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...
```

## 4. デプロイ設定

- Framework Preset: `Next.js`（自動検出される）
- Build Command: `npm run build`（デフォルト）
- Output Directory: `.next`（デフォルト）
- Install Command: `npm install`（デフォルト）

## 5. デプロイ実行

1. 「Deploy」ボタンをクリック
2. 約2-3分でデプロイ完了
3. 生成されたURLでアクセス可能に

## デプロイ後のURL

- 初期URL: `https://ludeek-bot-xxx.vercel.app`
- カスタムドメインも設定可能

## 更新方法

GitHubにプッシュするだけで自動的に再デプロイされます：

```bash
git add .
git commit -m "Update manual"
git push
```

## トラブルシューティング

### ビルドエラーが発生する場合
- 環境変数が正しく設定されているか確認
- `package.json`の依存関係を確認

### 500エラーが発生する場合
- Vercelのログを確認（Functions タブ）
- 環境変数（特にAPIキー）が正しいか確認

### デプロイは成功したが動作しない場合
- ブラウザの開発者ツールでエラーを確認
- Vercelの環境変数が反映されているか確認（再デプロイが必要な場合あり）