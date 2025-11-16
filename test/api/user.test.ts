import { expect, test } from "vitest";
import { getUserInfo, verifyCredentials } from "../../src/api/user";

const fetchOptions = {
  baseUrl: "https://api.twitcasting.tv",
  headers: new Headers(),
};

test("getUserInfo returns parsed user info", async () => {
  const res = await getUserInfo("182224938", fetchOptions);
  expect(res.data).toHaveProperty("user");
  expect(res.data.user.id).toBe("182224938");
  expect(res.data.supporter_count).toBeGreaterThanOrEqual(0);
});

test("verifyCredentials returns app and user info", async () => {
  const res = await verifyCredentials(fetchOptions);
  expect(res.data).toHaveProperty("app");
  expect(res.data).toHaveProperty("user");
  expect(res.data.app.owner_user_id).toBe("182224938");
});
