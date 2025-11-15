import type { AxiosInstance, AxiosResponse } from "axios";
import z from "zod";
import { movieScheme, userScheme } from "../common/schema";

// ---- Search Users ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#search-users //
// ---------------------------------------------- //

const searchUsersParamsScheme = z.object({
  words: z.string(),
  limit: z.number().min(1).max(50).default(10),
  lang: z.literal("ja"),
});
export type SearchUsersParams = z.infer<typeof searchUsersParamsScheme>;

const searchUsersResponseScheme = z.looseObject({
  users: z.array(userScheme),
});
export type SearchUsersResponse = z.infer<typeof searchUsersResponseScheme>;

export async function searchUsers(
  params: SearchUsersParams,
  axios: AxiosInstance
): Promise<AxiosResponse<SearchUsersResponse>> {
  const parsedParams = searchUsersParamsScheme.parse(params);
  const res = await axios.get(`/search/users`, {
    params: parsedParams,
  });
  const parsedData = searchUsersResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}

// ---- Search Live Movies ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#search-live-movies //
// ---------------------------------------------------- //

const searchLiveMoviesParamsScheme = z
  .object({
    limit: z.number().min(1).max(100).default(10),
    type: z.enum(["tag", "word", "category"]),
    context: z.string(),
    lang: z.literal("ja"),
  })
  .or(
    z.object({
      limit: z.number().min(1).max(100).default(10),
      type: z.enum(["new", "recommend"]),
      lang: z.literal("ja"),
    })
  );
export type SearchLiveMoviesParams = z.infer<
  typeof searchLiveMoviesParamsScheme
>;

const searchLiveMoviesResponseScheme = z.looseObject({
  movies: z.array(
    z.object({
      movie: movieScheme,
      broadcaster: userScheme,
      tags: z.array(z.string()),
    })
  ),
});
export type SearchLiveMoviesResponse = z.infer<
  typeof searchLiveMoviesResponseScheme
>;

export async function searchLiveMovies(
  params: SearchLiveMoviesParams,
  axios: AxiosInstance
): Promise<AxiosResponse<SearchLiveMoviesResponse>> {
  const parsedParams = searchLiveMoviesParamsScheme.parse(params);
  const res = await axios.get(`/search/lives`, {
    params: parsedParams,
  });
  const parsedData = searchLiveMoviesResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}
