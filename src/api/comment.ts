import z from "zod";
import { commentScheme } from "../common/schema";
import { TwiCasAPIFetchOptions } from ".";
import { formatResponse, TwiCasAPIEndpointFnReturn } from "./common";
import { setSearchParams } from "../utils";

// ---- Get Comments ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-comments //
// ---------------------------------------------- //

const getCommentsParamsScheme = z.object({
  offset: z.number().min(0).optional(),
  limit: z.number().min(1).max(50).optional(),
  slice_id: z.string().optional(),
});
export type GetCommentsParams = z.infer<typeof getCommentsParamsScheme>;

const getCommentsResponseScheme = z.looseObject({
  movie_id: z.string(),
  all_count: z.number(),
  comments: z.array(commentScheme),
});
export type GetCommentsResponse = z.infer<typeof getCommentsResponseScheme>;

export async function getComments(
  movieId: string,
  params: GetCommentsParams,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetCommentsResponse>> {
  const parsedParams = getCommentsParamsScheme.parse(params);
  const url = setSearchParams(
    new URL(`${option.baseUrl}/movies/${movieId}/comments`),
    parsedParams
  );
  const res = await fetch(url.toString(), { headers: option.headers });
  return formatResponse<GetCommentsResponse>(res, getCommentsResponseScheme);
}

// ---- Post Comment ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-comments //
// ---------------------------------------------- //

const postCommentParamsScheme = z.object({
  comment: z.string().min(1).max(140),
});
export type PostCommentParams = z.infer<typeof postCommentParamsScheme>;

const postCommentResponseScheme = z.looseObject({
  movie_id: z.string(),
  all_count: z.number(),
  comment: commentScheme,
});
export type PostCommentResponse = z.infer<typeof postCommentResponseScheme>;

export async function postComment(
  movieId: string,
  params: PostCommentParams,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<PostCommentResponse>> {
  const parsedParams = postCommentParamsScheme.parse(params);
  const headers = new Headers(option.headers);
  headers.set("Content-Type", "application/json");
  const res = await fetch(`${option.baseUrl}/movies/${movieId}/comments`, {
    method: "POST",
    headers,
    body: JSON.stringify(parsedParams),
  });
  return formatResponse<PostCommentResponse>(res, postCommentResponseScheme);
}

// ---- Delete Comment ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#delete-comment //
// ------------------------------------------------ //

const deleteCommentResponseScheme = z.object({
  comment_id: z.string(),
});
export type DeleteCommentResponse = z.infer<typeof deleteCommentResponseScheme>;

export async function deleteComment(
  movieId: string,
  commentId: string,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<DeleteCommentResponse>> {
  const res = await fetch(
    `${option.baseUrl}/movies/${movieId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: option.headers,
    }
  );
  return formatResponse<DeleteCommentResponse>(
    res,
    deleteCommentResponseScheme
  );
}
