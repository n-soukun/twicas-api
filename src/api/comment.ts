import type { AxiosInstance, AxiosResponse } from "axios";
import z from "zod";
import { commentScheme } from "../common/schema";

// ---- Get Comments ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-comments //
// ---------------------------------------------- //

const getCommentsParamsScheme = z.object({
  offset: z.number().min(0).default(0),
  limit: z.number().min(1).max(50).default(20),
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
  axios: AxiosInstance
): Promise<AxiosResponse<GetCommentsResponse>> {
  const parsedParams = getCommentsParamsScheme.parse(params);
  const res = await axios.get(`/movies/${movieId}/comments`, {
    params: parsedParams,
  });
  const parsedData = getCommentsResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
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
  axios: AxiosInstance
): Promise<AxiosResponse<PostCommentResponse>> {
  const parsedParams = postCommentParamsScheme.parse(params);
  const res = await axios.post(`/movies/${movieId}/comments`, parsedParams);
  const parsedData = postCommentResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
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
  axios: AxiosInstance
): Promise<AxiosResponse<DeleteCommentResponse>> {
  const res = await axios.delete(`/movies/${movieId}/comments/${commentId}`);
  const parsedData = deleteCommentResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}
