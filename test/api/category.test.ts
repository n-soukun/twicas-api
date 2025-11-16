import { expect, test, describe } from "vitest";
import { getCategories } from "../../src/api/category";

const fetchOptions = {
  baseUrl: "https://api.twitcasting.tv",
  headers: new Headers(),
};

describe("category API zod schema and params", () => {
  test("getCategories valid params parses response", async () => {
    const res = await getCategories({ lang: "ja" }, fetchOptions);
    expect(res.data).toHaveProperty("categories");
    expect(Array.isArray(res.data.categories)).toBe(true);
  });

  test("getCategories invalid params throws", async () => {
    await expect(() =>
      getCategories({ lang: "fr" } as any, fetchOptions)
    ).rejects.toThrow();
  });
});
