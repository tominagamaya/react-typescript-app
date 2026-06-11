# React + TypeScript + Vite

## 起動方法

このリポジトリは、フロントエンドとサーバーを別々のプロジェクトとして管理しています。

### 1. 依存関係のインストール

ルートディレクトリで以下を実行します。

```bash
pnpm install
```

### 2. フロントエンドとサーバーを同時に起動

ルートディレクトリで以下を実行すると、フロントエンドとサーバーの両方が起動します。

```bash
pnpm dev:all
```

- `pnpm dev:front` : フロントエンドのみ起動
- `pnpm dev:server` : サーバーのみ起動

### 3. 起動先 URL

- フロントエンド: `http://localhost:5173`
- サーバー: `http://localhost:3000`

### 4. パスについて

- フロントエンドのルートはワークスペース直下の `src/` フォルダです。
- サーバーのエントリーポイントは `server/index.ts` です。
- サーバー設定は `server/.env.development` で管理されています。

### 5. 注意点

サーバーは `server/.env.development` の `PORT` と `FRONTEND_URL` を読み込んで起動します。フロントエンド側も `http://localhost:5173` からのアクセスを許可するようになっています。
