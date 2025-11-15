import axios from "axios";
import { expect, test, describe } from "vitest";
import { searchUsers, searchLiveMovies } from "../../src/api/search";

const client = axios.create({ baseURL: "https://api.twitcasting.tv" });

describe("search API zod schema and params", () => {
  test("searchUsers valid params parses response", async () => {
    const res = await searchUsers({ words: "foo", lang: "ja" }, client);
    expect(res.data).toHaveProperty("users");
    expect(Array.isArray(res.data.users)).toBe(true);
  });

  test("searchUsers invalid params throws", async () => {
    // missing lang -> runtime validation should fail
    // @ts-expect-error intentionally invalid
    await expect(() => searchUsers({ words: "foo" }, client)).rejects.toThrow();
  });

  test("searchLiveMovies variant with context parses", async () => {
    const res = await searchLiveMovies({ type: "tag", context: "music", lang: "ja" }, client);
    expect(res.data).toHaveProperty("movies");
    expect(Array.isArray(res.data.movies)).toBe(true);
  });

  test("searchLiveMovies variant 'new' parses and invalid variant errors", async () => {
    const res = await searchLiveMovies({ type: "new", lang: "ja" }, client);
    expect(res.data).toHaveProperty("movies");

    // invalid: type 'tag' but missing context
    // @ts-expect-error intentionally invalid
    await expect(() => searchLiveMovies({ type: "tag", lang: "ja" }, client)).rejects.toThrow();
  });
});
