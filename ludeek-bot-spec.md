# Ludeek Bot 仕様書

## 概要
飲食店向けのマニュアルチャットボット。スタッフが質問すると、登録されたマニュアルに基づいてAIが回答する。同じインターフェースでマニュアルの編集も可能。

## 基本要件
- ブラウザで動作するWebアプリケーション
- 認証不要（URLを知っている人が利用可能）
- マニュアルは約50,000字のテキスト
- OpenAI APIを使用
- チャットとマニュアル編集が同一インターフェース
- デザイン：白黒2色のミニマルデザイン

## 技術スタック
- フロントエンド: Next.js (TypeScript)
- スタイリング: Tailwind CSS
- データベース: Supabase (PostgreSQL)
- ホスティング: Vercel
- LLM: OpenAI API (GPT-4)
- エディタ: リッチテキストエディタ（TipTap推奨）

## デザイン仕様
- カラーパレット：
  - 背景：#FFFFFF（白）
  - テキスト：#000000（黒）
  - ボーダー：#E5E5E5（薄いグレー）
  - ホバー：#F5F5F5（非常に薄いグレー）
- フォント：システムフォント（-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans"）
- 余白を活かしたミニマルデザイン
- 装飾的な要素を排除

## 機能仕様

### 1. メインインターフェース
- 画面上部に「Ludeek bot」（シンプルなテキストのみ）
- チャットモードとマニュアル編集モードの切り替えボタン（テキストボタン）
- レスポンシブデザイン（スマホでも使いやすく）

### 2. チャットモード
- シンプルなチャット画面
- 質問入力欄（黒枠線のみ）
- 送信ボタン（黒背景、白文字）
- AIの回答表示（左寄せ、適切な行間）
- 各回答下部に「編集」「Good」「Bad」のテキストボタン
- 編集ボタンで関連箇所をインライン編集可能

### 3. マニュアル編集モード
- カテゴリ別タブ（接客・調理・清掃・その他）
- シンプルなタブデザイン（下線でアクティブ表示）
- リッチテキストエディタ（最小限のツールバー）
- 自動保存機能（3秒後に保存）
- 変更履歴（過去5件、シンプルなリスト表示）

### 4. データ構造

#### manuals テーブル
```sql
CREATE TABLE manuals (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  updated_by VARCHAR(100)
);
```

#### chat_logs テーブル
```sql
CREATE TABLE chat_logs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  feedback VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. AI処理仕様
- システムプロンプト：
  ```
  あなたは飲食店のマニュアルに基づいて回答するアシスタントです。
  以下のマニュアルの内容に基づいて、スタッフの質問に答えてください。
  マニュアルに記載がない内容については、「マニュアルに記載がありません」と回答してください。
  
  マニュアル内容：
  [マニュアル全文]
  ```
- モデル：gpt-4-turbo-preview
- 温度設定：0.3（一貫性重視）

### 6. API仕様

#### POST /api/chat
リクエスト：
```json
{
  "question": "string"
}
```
レスポンス：
```json
{
  "answer": "string",
  "id": "string"
}
```

#### GET /api/manual/:category
レスポンス：
```json
{
  "category": "string",
  "content": "string",
  "updated_at": "datetime"
}
```

#### PUT /api/manual/:category
リクエスト：
```json
{
  "content": "string"
}
```

### 7. UI要件
- ボタンサイズ：高さ40px以上（タッチ操作考慮）
- フォントサイズ：本文16px、見出し20px
- 行間：1.6
- 余白：要素間は最低16px
- ローディング：シンプルなスピナー（黒）
- トースト通知：画面上部に黒背景、白文字

## 環境変数
```env
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## ディレクトリ構造
```
/app
  /api
    /chat
      route.ts
    /manual
      [category]
        route.ts
  /components
    ChatInterface.tsx
    ManualEditor.tsx
    ModeToggle.tsx
    LoadingSpinner.tsx
    Toast.tsx
  /lib
    supabase.ts
    openai.ts
  /types
    index.ts
  page.tsx
  layout.tsx
  globals.css
```

## エラーハンドリング
- API接続エラー：「接続エラーが発生しました。再度お試しください。」
- 保存エラー：「保存に失敗しました。再度お試しください。」
- 読み込みエラー：「データの読み込みに失敗しました。」

## パフォーマンス要件
- 初回読み込み：3秒以内
- チャット応答：5秒以内
- マニュアル保存：2秒以内

## セキュリティ要件
- APIキーはサーバーサイドのみで使用
- SQLインジェクション対策（パラメータ化クエリ使用）
- XSS対策（React標準のエスケープ処理）

## 納品物
1. GitHubリポジトリ（プライベート）
2. Vercelへのデプロイ済みアプリケーション
3. 環境構築手順書（README.md）
4. スタッフ向け操作マニュアル（PDF形式）

## 今後の拡張可能性
- 画像対応（マニュアル内への画像挿入）
- 複数店舗対応（店舗別マニュアル管理）
- スタッフ別の編集権限
- マニュアルのPDFエクスポート機能
- チャット履歴の分析機能