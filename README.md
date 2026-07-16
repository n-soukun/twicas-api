# twicas-api

TwiCas API v2 向けの軽量 TypeScript クライアントです。

## インストール

```sh
pnpm add twicas-api
```

## 使い方

### クライアントの作成

アクセストークンまたは、クライアントIDとクライアントシークレットを使ってクライアントを作成します。

#### アクセストークンを使う場合

```ts
const client = new TwiCasClient({
  accessToken: process.env.TWITCASTING_ACCESS_TOKEN!,
});
```

#### クライアントIDとクライアントシークレットを使う場合

```ts
const client = new TwiCasClient({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
});
```

### リクエストを送る

作成した`TwiCasClient`インスタンスのメソッドを使ってリクエストを送信できます。

#### 例：ライブ配信を検索

```ts
const result = await client.searchLiveMovies({
  limit: 10,
  type: "word",
  context: "雑談",
  lang: "ja",
});
```

### レスポンスを処理する

`TwiCasClient`インスタンスのメソッドは以下の振る舞いをします。

- リクエストが成功した場合: `TwiCasAPIEndpointFnReturn`型を返します。
- リクエストが失敗した場合： `TwiCasAPIError`をスローします。

#### 例：ライブのテロップを設定する

```ts
try {
  const result = await client.setCurrentLiveSubtitle({
    subtitle: "テスト",
  });

  const movieId = result.data.movie_id;
} catch (error) {
  if (error instanceof TwiCasAPIError) {
    console.error(`エラーコード：${error.code}, メッセージ：${error.message}`);
  }
  throw error;
}
```

### WebHookを受け取る

#### express

```ts
import express from "express";
import { TwiCasWebHookReceiver } from "twicas-api/express";

const app = express();
const port = 3000;

const signature = "the_webhook_signature";
const receiver = new TwiCasWebHookReceiver(signature);
receiver.on("received", (data) => {
  console.log(data);
});

app.get("/webhook", receiver.handleRequest);

app.listen(port, () => {
  console.log(`WebHook Receiver running on http://localhost:${port}/webhook`);
});
```

#### hono

```ts
import { Hono } from "hono";
import { TwiCasWebHookReceiver } from "twicas-api/hono";

const app = new Hono();

const signature = "the_webhook_signature";
const receiver = new TwiCasWebHookReceiver(signature);
receiver.on("received", (data) => {
  console.log(data);
});

app.get("/webhook", receiver.handleRequest);

export default app;
```

## ライセンス

このプロジェクトは `MIT` ライセンスの下で公開されています。詳細は `LICENSE` を参照してください。

## その他

詳細な API リファレンスは [TwitCasting API v2 の公式ドキュメント](https://apiv2-doc.twitcasting.tv/)を参照してください。
