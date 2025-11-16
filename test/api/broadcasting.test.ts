import { expect, test, describe } from "vitest";
import { getRTMPUrl } from "../../src/api/broadcasting";

const fetchOptions = {
  baseUrl: "https://api.twitcasting.tv",
  headers: new Headers(),
};

describe("broadcasting API zod schema", () => {
  test("getRTMPUrl parses response", async () => {
    const res = await getRTMPUrl(fetchOptions);
    expect(res.data).toHaveProperty("enabled");
    expect(typeof res.data.enabled).toBe("boolean");
    expect(res.data).toHaveProperty("url");
  });
});
