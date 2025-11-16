import { expect, test, describe } from "vitest";
import { getGifts } from "../../src/api/gift";

const fetchOptions = {
  baseUrl: "https://api.twitcasting.tv",
  headers: new Headers(),
};

describe("gift API zod schema and params", () => {
  test("getGifts with default/valid params parses response", async () => {
    const res = await getGifts({ slice_id: -1 }, fetchOptions);
    expect(res.data).toHaveProperty("slice_id");
    expect(Array.isArray(res.data.gifts)).toBe(true);
  });

  test("getGifts invalid params throws zod error", async () => {
    await expect(() =>
      getGifts({ slice_id: -2 }, fetchOptions)
    ).rejects.toThrow();
  });
});
