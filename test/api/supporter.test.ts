import { expect, test, describe } from "vitest";
import {
  getSupportingStatus,
  supportUser,
  unsupportUser,
  getSupportingList,
  getSupporterList,
} from "../../src/api/supporter";

const fetchOptions = {
  baseUrl: "https://api.twitcasting.tv",
  headers: new Headers(),
};

describe("supporter API zod schema and params", () => {
  test("getSupportingStatus valid params parses response", async () => {
    const res = await getSupportingStatus(
      "user-1",
      { target_user_id: "3160885238" },
      fetchOptions
    );
    expect(res.data).toHaveProperty("is_supporting");
    expect(res.data).toHaveProperty("target_user");
  });

  test("getSupportingStatus invalid params throws", async () => {
    await expect(() =>
      getSupportingStatus("user-1", {} as any, fetchOptions)
    ).rejects.toThrow();
  });

  test("supportUser and unsupportUser validate params", async () => {
    const supRes = await supportUser(
      { target_user_ids: ["1", "2"] },
      fetchOptions
    );
    expect(supRes.data).toHaveProperty("added_count");

    await expect(() =>
      supportUser({ target_user_ids: [] }, fetchOptions)
    ).rejects.toThrow();

    const unsupRes = await unsupportUser(
      { target_user_ids: ["1"] },
      fetchOptions
    );
    expect(unsupRes.data).toHaveProperty("removed_count");

    await expect(() =>
      unsupportUser({ target_user_ids: [] }, fetchOptions)
    ).rejects.toThrow();
  });

  test("getSupportingList and getSupporterList parse responses and validate params", async () => {
    const supList = await getSupportingList(
      "user-1",
      { offset: 0, limit: 10 },
      fetchOptions
    );
    expect(supList.data).toHaveProperty("total");

    await expect(() =>
      getSupportingList("user-1", { offset: -1, limit: 10 }, fetchOptions)
    ).rejects.toThrow();

    const supporterList = await getSupporterList(
      "user-1",
      { offset: 0, limit: 10, sort: "new" },
      fetchOptions
    );
    expect(supporterList.data).toHaveProperty("total");

    await expect(() =>
      getSupporterList(
        "user-1",
        { offset: 0, limit: 10, sort: "bad" } as any,
        fetchOptions
      )
    ).rejects.toThrow();
  });
});
