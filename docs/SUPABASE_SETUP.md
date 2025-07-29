# Supabaseセットアップガイド

## 1. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com) にアクセス
2. 「Start your project」をクリック
3. GitHubアカウントでログイン
4. 「New project」をクリック
5. プロジェクト名：`ludeek-bot`
6. データベースパスワードを設定（安全な場所に保存）
7. リージョン：`Northeast Asia (Tokyo)`を選択
8. 「Create new project」をクリック

## 2. テーブルの作成

Supabaseダッシュボードで「SQL Editor」を開き、以下のSQLを実行：

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

-- 初期データの挿入
INSERT INTO manuals (category, content) VALUES
('接客', '# 接客マニュアル

## 基本的な接客
1. お客様が来店されたら「いらっしゃいませ」と明るく挨拶
2. 席にご案内する際は、お客様の人数を確認
3. メニューをお渡しし、お決まりになったらお声掛けくださいと伝える

## 注文の取り方
1. ハンディを持って注文を取る
2. 注文内容を復唱して確認
3. アレルギーの有無を確認

## 会計
1. レジでの会計時は金額を声に出して確認
2. お釣りは両手で丁寧にお渡しする'),
('調理', '# 調理マニュアル

## 衛生管理
1. 調理前は必ず手洗い・消毒
2. 食材は先入れ先出しを徹底
3. まな板は食材ごとに使い分ける

## 調理手順
1. オーダーが入ったら調理開始
2. レシピ通りの分量を守る
3. 盛り付けは見本写真を参考に'),
('清掃', '# 清掃マニュアル

## 開店前清掃
1. 床の掃き掃除とモップがけ
2. テーブル・椅子の拭き上げ
3. トイレの清掃と備品補充

## 営業中の清掃
1. お客様が退店したらすぐにテーブルを片付ける
2. こぼれた物はすぐに清掃'),
('その他', '# その他のマニュアル

## 緊急時対応
1. 火災時は初期消火を試み、無理な場合は避難誘導
2. 地震時は身の安全を確保し、揺れが収まってから避難

## 勤怠管理
1. 出勤時・退勤時は必ずタイムカードを打刻
2. シフト変更は3日前までに申請');
```

## 3. 環境変数の設定

1. Supabaseダッシュボードで「Settings」→「API」を開く
2. 以下の値をコピーして `.env.local` に設定：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJS...
```

## 4. Row Level Security (RLS)の設定

セキュリティを考慮する場合は、以下のRLSポリシーを設定：

```sql
-- manualsテーブルのRLS
ALTER TABLE manuals ENABLE ROW LEVEL SECURITY;

-- 読み取りは全員可能
CREATE POLICY "Enable read access for all users" ON manuals
FOR SELECT USING (true);

-- 書き込みは全員可能（本番環境では認証を追加）
CREATE POLICY "Enable write access for all users" ON manuals
FOR ALL USING (true);

-- chat_logsテーブルのRLS
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;

-- 書き込みは全員可能
CREATE POLICY "Enable insert for all users" ON chat_logs
FOR INSERT WITH CHECK (true);
```

## 5. 動作確認

1. 開発サーバーを再起動
2. チャットで質問してみる
3. マニュアルを編集してみる
4. Supabaseダッシュボードの「Table Editor」でデータが保存されているか確認

## トラブルシューティング

- **接続エラーが発生する場合**
  - 環境変数が正しく設定されているか確認
  - Supabaseプロジェクトが起動しているか確認
  
- **データが保存されない場合**
  - RLSポリシーが正しく設定されているか確認
  - ブラウザのコンソールでエラーを確認