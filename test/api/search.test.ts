import { expect, test, describe } from "vitest";
import { searchUsers, searchLiveMovies } from "../../src/api/search";

const fetchOptions = {
  baseUrl: "https://api.twitcasting.tv",
  headers: new Headers(),
};

describe("search API zod schema and params", () => {
  test("searchUsers valid params parses response", async () => {
    const res = await searchUsers({ words: "foo", lang: "ja" }, fetchOptions);
    expect(res.data).toHaveProperty("users");
    expect(Array.isArray(res.data.users)).toBe(true);
  });

  test("searchUsers invalid params throws", async () => {
    await expect(() =>
      searchUsers({ words: "foo" } as any, fetchOptions)
    ).rejects.toThrow();
  });

  test("searchLiveMovies variant with context parses", async () => {
    const res = await searchLiveMovies(
      { type: "tag", context: "music", lang: "ja" },
      fetchOptions
    );
    expect(res.data).toHaveProperty("movies");
    expect(Array.isArray(res.data.movies)).toBe(true);
  });

  test("searchLiveMovies variant 'new' parses and invalid variant errors", async () => {
    const res = await searchLiveMovies(
      { type: "new", lang: "ja" },
      fetchOptions
    );
    expect(res.data).toHaveProperty("movies");

    await expect(() =>
      searchLiveMovies({ type: "tag", lang: "ja" } as any, fetchOptions)
    ).rejects.toThrow();
  });
});
