import axios from "axios";
import { expect, test, describe } from "vitest";
import { getRTMPUrl } from "../../src/api/broadcasting";

const client = axios.create({ baseURL: "https://api.twitcasting.tv" });

describe("broadcasting API zod schema", () => {
  test("getRTMPUrl parses response", async () => {
    const res = await getRTMPUrl(client);
    expect(res.data).toHaveProperty("enabled");
    expect(typeof res.data.enabled).toBe("boolean");
    expect(res.data).toHaveProperty("url");
  });
});
