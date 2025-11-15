import "dotenv/config";
import { TwiCasClient } from "../../src/index";

async function main() {
  const clientId = process.env.TWICAS_CLIENT_ID;
  const clientSecret = process.env.TWICAS_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("TWICAS_CLIENT_ID and TWICAS_CLIENT_SECRET are required");
  }

  const userId = process.argv[2] || "twitcasting_jp";

  const client = new TwiCasClient({
    clientId,
    clientSecret,
  });

  const userInfo = await client.getUserInfo(userId);
  console.log(userInfo.data);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
