import { expect, test, describe } from "vitest";
import {
  getWebHookList,
  registerWebHook,
  removeWebHook,
} from "../../src/api/webHook";

const fetchOptions = {
  baseUrl: "https://api.twitcasting.tv",
  headers: new Headers(),
};

describe("webhook API zod schema and params", () => {
  test("getWebHookList valid params parses response", async () => {
    const res = await getWebHookList({ limit: 10, offset: 0 }, fetchOptions);
    expect(res.data).toHaveProperty("all_count");
    expect(Array.isArray(res.data.webhooks)).toBe(true);
  });

  test("registerWebHook valid and invalid params", async () => {
    const res = await registerWebHook(
      { user_id: "7134775954", events: ["livestart"] },
      fetchOptions
    );
    expect(res.data).toHaveProperty("user_id");

    await expect(() =>
      registerWebHook({ events: ["livestart"] } as any, fetchOptions)
    ).rejects.toThrow();
  });

  test("removeWebHook valid and invalid params", async () => {
    const res = await removeWebHook(
      { user_id: "7134775954", events: ["livestart"] },
      fetchOptions
    );
    expect(res.data).toHaveProperty("user_id");

    await expect(() =>
      removeWebHook({ user_id: "7134775954" } as any, fetchOptions)
    ).rejects.toThrow();
  });
});
