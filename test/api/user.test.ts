import axios from "axios";
import { expect, test } from "vitest";
import { getUserInfo, verifyCredentials } from "../../src/api/user";

test("getUserInfo returns parsed user info", async () => {
  const client = axios.create({ baseURL: "https://api.twitcasting.tv" });
  const res = await getUserInfo("182224938", client);
  expect(res.data).toHaveProperty("user");
  expect(res.data.user.id).toBe("182224938");
  expect(res.data.supporter_count).toBeGreaterThanOrEqual(0);
});

test("verifyCredentials returns app and user info", async () => {
  const client = axios.create({ baseURL: "https://api.twitcasting.tv" });
  const res = await verifyCredentials(client);
  expect(res.data).toHaveProperty("app");
  expect(res.data).toHaveProperty("user");
  expect(res.data.app.owner_user_id).toBe("182224938");
});
