import axios from "axios";
import { expect, test, describe } from "vitest";
import { getCategories } from "../../src/api/category";

const client = axios.create({ baseURL: "https://api.twitcasting.tv" });

describe("category API zod schema and params", () => {
  test("getCategories valid params parses response", async () => {
    const res = await getCategories({ lang: "ja" }, client);
    expect(res.data).toHaveProperty("categories");
    expect(Array.isArray(res.data.categories)).toBe(true);
  });

  test("getCategories invalid params throws", async () => {
    // invalid enum value at runtime (compile-time suppressed)
    // @ts-expect-error intentionally passing invalid enum value
    await expect(() => getCategories({ lang: "fr" }, client)).rejects.toThrow();
  });
});
