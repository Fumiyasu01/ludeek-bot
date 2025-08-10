# Ludeek Bot 引き継ぎガイド

## 1. GitHubリポジトリの受け取り

招待メールから承認してください。
リポジトリURL: https://github.com/Fumiyasu01/ludeek-bot

## 2. 必要なアカウントの準備

以下の3つのアカウントが必要です：

### OpenAI
1. https://platform.openai.com でアカウント作成
2. APIキーを生成
3. クレジットカードを登録
4. 使用上限を設定（推奨：$50/月）

### Vercel
1. https://vercel.com でアカウント作成
2. GitHubと連携

### Supabase
1. https://supabase.com でアカウント作成
2. 新規プロジェクトを作成

## 3. セットアップ手順

### 3.1 Supabaseのセットアップ
1. 新規プロジェクトを作成（リージョン：Tokyo）
2. SQL Editorで以下を実行：

```sql
-- manualsテーブル
CREATE TABLE manuals (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by VARCHAR(100),
  UNIQUE(category)
);

-- chat_logsテーブル
CREATE TABLE chat_logs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  feedback VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 初期データ
INSERT INTO manuals (category, content) VALUES
('接客', ''),
('調理', ''),
('清掃', ''),
('その他', '');
```

3. Settings → APIから以下をコピー：
   - Project URL
   - anon public キー

### 3.2 Vercelでデプロイ
1. Vercelにログイン
2. 「Add New」→「Project」
3. GitHubから`ludeek-bot`をインポート
4. Environment Variablesに以下を設定：

```
OPENAI_API_KEY=あなたのOpenAI APIキー
NEXT_PUBLIC_SUPABASE_URL=SupabaseのProject URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=Supabaseのanon publicキー
```

5. Deployをクリック

## 4. デプロイ後の確認

1. 生成されたURLにアクセス
2. マニュアルを登録
3. チャット機能をテスト

## 5. 今後の管理

- コード変更：GitHubで編集→自動デプロイ
- 環境変数変更：Vercel → Settings → Environment Variables
- データ確認：Supabase → Table Editor

## サポート

ご不明な点は開発者までご連絡ください。