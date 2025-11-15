import axios from "axios";
import { expect, test, describe } from "vitest";
import { getComments, postComment, deleteComment } from "../../src/api/comment";

const client = axios.create({ baseURL: "https://api.twitcasting.tv" });

describe("comment API zod schema and params", () => {
  test("getComments valid params parses response", async () => {
    const res = await getComments(
      "189037369",
      { offset: 0, limit: 10 },
      client
    );
    expect(res.data).toHaveProperty("movie_id");
    expect(Array.isArray(res.data.comments)).toBe(true);
  });

  test("getComments invalid params throws zod error", async () => {
    await expect(() =>
      getComments("189037369", { offset: -1, limit: 10 }, client)
    ).rejects.toThrow();
  });

  test("postComment valid and invalid params", async () => {
    const postRes = await postComment(
      "189037369",
      { comment: "hello" },
      client
    );
    expect(postRes.data).toHaveProperty("comment");
    await expect(() =>
      postComment("189037369", { comment: "" }, client)
    ).rejects.toThrow();
  });

  test("deleteComment parses response", async () => {
    const res = await deleteComment("189037369", "7134775954", client);
    expect(res.data).toHaveProperty("comment_id");
  });
});
