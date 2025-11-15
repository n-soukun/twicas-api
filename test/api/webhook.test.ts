import axios from "axios";
import { expect, test, describe } from "vitest";
import {
  getWebHookList,
  registerWebHook,
  removeWebHook,
} from "../../src/api/webHook";

const client = axios.create({ baseURL: "https://api.twitcasting.tv" });

describe("webhook API zod schema and params", () => {
  test("getWebHookList valid params parses response", async () => {
    const res = await getWebHookList({ limit: 10, offset: 0 }, client);
    expect(res.data).toHaveProperty("all_count");
    expect(Array.isArray(res.data.webhooks)).toBe(true);
  });

  test("registerWebHook valid and invalid params", async () => {
    const res = await registerWebHook(
      { user_id: "7134775954", events: ["livestart"] },
      client
    );
    expect(res.data).toHaveProperty("user_id");

    // missing user_id should throw at runtime
    // @ts-expect-error intentionally invalid
    await expect(() =>
      registerWebHook({ events: ["livestart"] }, client)
    ).rejects.toThrow();
  });

  test("removeWebHook valid and invalid params", async () => {
    const res = await removeWebHook(
      { user_id: "7134775954", events: ["livestart"] },
      client
    );
    expect(res.data).toHaveProperty("user_id");

    // missing events should throw
    // @ts-expect-error intentionally invalid
    await expect(() =>
      removeWebHook({ user_id: "7134775954" }, client)
    ).rejects.toThrow();
  });
});
