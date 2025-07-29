# Ludeek Bot

飲食店向けのマニュアルチャットボットアプリケーション

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルに以下の環境変数を設定してください：

```env
# OpenAI API Key (必須)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

# Supabase設定 (後で追加)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

OpenAI APIキーは [OpenAI Platform](https://platform.openai.com/api-keys) から取得できます。

### 3. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションにアクセスできます。

## 機能

- **チャットモード**: マニュアルに基づいてAIが質問に回答
- **編集モード**: カテゴリ別にマニュアルを編集（自動保存機能付き）

## 使い方

1. チャットモードで質問を入力（例：「接客の基本を教えて」）
2. AIがマニュアルに基づいて回答
3. 編集モードでマニュアルの内容を更新可能

## Supabaseセットアップ（オプション）

データを永続化する場合は、[Supabaseセットアップガイド](./docs/SUPABASE_SETUP.md)を参照してください。

## 注意事項

- OpenAI APIキーが設定されていない場合は、モック回答が返されます
- Supabaseが設定されていない場合は、メモリ内にデータを保存します（サーバー再起動でリセット）
- 本番環境では必ずSupabaseを設定してください