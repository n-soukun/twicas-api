# twicas-api

TwiCas API v2 向けの軽量 TypeScript クライアントです。

## 概要

- TwitCasting API v2 の主要エンドポイント（ユーザー情報、ムービー、コメント、ギフト、サポーター、検索、サムネイル、WebHook、RTMP など）をラップします。
- TypeScript で型付きに利用できます。

## 主な機能

- ユーザ情報取得 (`getUserInfo`, `verifyCredentials`)
- ライブ / ムービー情報 (`getMovieInfo`, `getCurrentLive`, `getMoviesByUser`)
- コメント操作 (`getComments`, `postComment`, `deleteComment`)
- ギフト取得 (`getGifts`)
- サポーター関連 (`supportUser`, `unsupportUser`, `getSupporterList` 等)
- 検索 (`searchUsers`, `searchLiveMovies`)
- ライブサムネイル取得 (`createLiveThumbnailUrl`, `getLiveThumbnailImage`)
- WebHook 登録/一覧/削除
- RTMP URL 取得

## インストール

PowerShell (pnpm)

```powershell
pnpm add twicas-api
```

または npm / yarn:

```powershell
npm install twicas-api
# または
yarn add twicas-api
```

ローカルの開発リポジトリで試す場合:

```powershell
pnpm install
pnpm run build
```

## 使い方（簡単な例）

```ts
import { TwiCasClient } from "twicas-api";

// アクセストークンを使ったユーザ認証
const client = new TwiCasClient({
  accessToken: process.env.TWITCASTING_ACCESS_TOKEN!,
});

// または アプリケーション認証（clientId/clientSecret）
// const client = new TwiCasClient({ clientId: "YOUR_CLIENT_ID", clientSecret: "YOUR_CLIENT_SECRET" });

async function main() {
  // ユーザ情報取得
  const user = await client.getUserInfo("some_user_id_or_screen_id");
  console.log(user.data);

  // ライブ検索
  const live = await client.searchLiveMovies({ q: "", limit: 10 });
  console.log(live.data);
}

main().catch(console.error);
```

### 認証オプション

- ユーザ単位: `accessToken`（Bearer）
- アプリ単位: `clientId` と `clientSecret`（Basic, base64 エンコード）

### エラーハンドリング

- API エラーは `TwiCasAPIError` としてラップされます。HTTP レスポンス全体やステータス、ボディが確認できます。

### レートリミット

- 主要なエンドポイントからはレスポンスヘッダのレートリミット情報（limit / remaining / reset）を取得できます。

## テスト

このリポジトリにはユニットテスト（`vitest`）が含まれています。ローカルで実行するには:

```powershell
pnpm install
pnpm test
```

## 貢献

- バグ報告、機能要望、プルリクエスト歓迎です。まず Issue を作成してください。

## ライセンス

- このプロジェクトは `MIT` ライセンスの下で公開されています。詳細は `LICENSE` を参照してください。

## その他

- 詳細な API リファレンスは TwitCasting API v2 の公式ドキュメントを参照してください: https://apiv2-doc.twitcasting.tv/
