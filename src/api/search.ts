import z from "zod";
import { movieScheme, userScheme } from "../common/schema";
import { TwiCasAPIFetchOptions } from ".";
import { formatResponse, TwiCasAPIEndpointFnReturn } from "./common";
import { setSearchParams } from "../utils";

// ---- Search Users ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#search-users //
// ---------------------------------------------- //

const searchUsersParamsScheme = z.object({
  words: z.string(),
  limit: z.number().min(1).max(50).optional(),
  lang: z.literal("ja"),
});
export type SearchUsersParams = z.infer<typeof searchUsersParamsScheme>;

const searchUsersResponseScheme = z.looseObject({
  users: z.array(userScheme),
});
export type SearchUsersResponse = z.infer<typeof searchUsersResponseScheme>;

export async function searchUsers(
  params: SearchUsersParams,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<SearchUsersResponse>> {
  const parsedParams = searchUsersParamsScheme.parse(params);
  const url = setSearchParams(
    new URL(`${option.baseUrl}/search/users`),
    parsedParams
  );
  const res = await fetch(url.toString(), { headers: option.headers });
  return formatResponse<SearchUsersResponse>(res, searchUsersResponseScheme);
}

// ---- Search Live Movies ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#search-live-movies //
// ---------------------------------------------------- //

const searchLiveMoviesParamsScheme = z
  .object({
    limit: z.number().min(1).max(100).optional(),
    type: z.enum(["tag", "word", "category"]),
    context: z.string(),
    lang: z.literal("ja"),
  })
  .or(
    z.object({
      limit: z.number().min(1).max(100).optional(),
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
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<SearchLiveMoviesResponse>> {
  const parsedParams = searchLiveMoviesParamsScheme.parse(params);
  const url = setSearchParams(
    new URL(`${option.baseUrl}/search/lives`),
    parsedParams
  );
  const res = await fetch(url.toString(), { headers: option.headers });
  return formatResponse<SearchLiveMoviesResponse>(
    res,
    searchLiveMoviesResponseScheme
  );
}
