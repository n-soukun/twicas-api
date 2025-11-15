import axios from "axios";
import { expect, test, describe } from "vitest";
// MSW is started globally via test/mock/setupTests.ts — do not import it here.

import {
  getMovieInfo,
  getMoviesByUser,
  getCurrentLive,
  setCurrentLiveSubtitle,
  setCurrentLiveHashtag,
} from "../../src/api/movie";

const client = axios.create({ baseURL: "https://api.twitcasting.tv" });

describe("movie API zod schema validation", () => {
  test("getMovieInfo parses response without zod errors", async () => {
    // MSW handlers (test/mock) intercept the request and should return
    // a response that matches the Zod schema. We simply call the function
    // via axios and assert the parsed result exists (no Zod error thrown).
    const res = await getMovieInfo("movie-1", client);
    expect(res.data).toBeDefined();
    expect(res.data).toHaveProperty("movie");
  });

  test("getMoviesByUser parses response and validates params", async () => {
    // valid params -> should parse response
    const goodParams = { offset: 0, limit: 10 };
    const res = await getMoviesByUser("user-1", goodParams, client);
    expect(res.data).toBeDefined();

    // invalid params -> zod should throw before HTTP call
    await expect(() =>
      getMoviesByUser("user-1", { offset: -1, limit: 0 }, client)
    ).rejects.toThrow();
  });

  test("getCurrentLive parses response without zod errors", async () => {
    const res = await getCurrentLive("user-1", client);
    expect(res.data).toBeDefined();
  });

  test("setCurrentLiveSubtitle validates params and parses response", async () => {
    const res = await setCurrentLiveSubtitle({ subtitle: "hello" }, client);
    expect(res.data).toBeDefined();

    // invalid -> empty subtitle should fail validation before HTTP
    await expect(() =>
      setCurrentLiveSubtitle({ subtitle: "" }, client)
    ).rejects.toThrow();
  });

  test("setCurrentLiveHashtag validates params and parses response", async () => {
    const res = await setCurrentLiveHashtag({ hashtag: "tag123" }, client);
    expect(res.data).toBeDefined();

    // invalid -> contains non-alnum should fail validation before HTTP
    await expect(() =>
      setCurrentLiveHashtag({ hashtag: "#bad" }, client)
    ).rejects.toThrow();
  });
});
