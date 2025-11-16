import { expect, test, describe } from "vitest";
import { getComments, postComment, deleteComment } from "../../src/api/comment";

const fetchOptions = {
  baseUrl: "https://api.twitcasting.tv",
  headers: new Headers(),
};

describe("comment API zod schema and params", () => {
  test("getComments valid params parses response", async () => {
    const res = await getComments(
      "189037369",
      { offset: 0, limit: 10 },
      fetchOptions
    );
    expect(res.data).toHaveProperty("movie_id");
    expect(Array.isArray(res.data.comments)).toBe(true);
  });

  test("getComments invalid params throws zod error", async () => {
    await expect(() =>
      getComments("189037369", { offset: -1, limit: 10 }, fetchOptions)
    ).rejects.toThrow();
  });

  test("postComment valid and invalid params", async () => {
    const postRes = await postComment(
      "189037369",
      { comment: "hello" },
      fetchOptions
    );
    expect(postRes.data).toHaveProperty("comment");
    await expect(() =>
      postComment("189037369", { comment: "" }, fetchOptions)
    ).rejects.toThrow();
  });

  test("deleteComment parses response", async () => {
    const res = await deleteComment("189037369", "7134775954", fetchOptions);
    expect(res.data).toHaveProperty("comment_id");
  });
});
