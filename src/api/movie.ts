import z from "zod";
import { movieScheme, userScheme } from "../common/schema";
import { TwiCasAPIFetchOptions } from ".";
import { formatResponse, TwiCasAPIEndpointFnReturn } from "./common";
import { setSearchParams } from "../utils";

// ---- Get Movie Info ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-movie-info //
// ------------------------------------------------ //

const getMovieInfoResponseScheme = z.looseObject({
  movie: movieScheme,
  broadcaster: userScheme,
  tags: z.array(z.string()),
});
export type GetMovieInfoResponse = z.infer<typeof getMovieInfoResponseScheme>;

export async function getMovieInfo(
  movieId: string,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetMovieInfoResponse>> {
  const res = await fetch(`${option.baseUrl}/movies/${movieId}`, {
    headers: option.headers,
  });
  return formatResponse<GetMovieInfoResponse>(res, getMovieInfoResponseScheme);
}

// ---- Get Movies by User ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-movies-by-user //
// ---------------------------------------------------- //

const getMoviesByUserParamsScheme = z.object({
  offset: z.number().min(0).max(1000).optional(),
  limit: z.number().min(1).max(50).optional(),
  slice_id: z.string().optional(),
});
export type GetMoviesByUserParams = z.infer<typeof getMoviesByUserParamsScheme>;

const getMoviesByUserResponseScheme = z.looseObject({
  total_count: z.number(),
  movies: z.array(movieScheme),
});
export type GetMoviesByUserResponse = z.infer<
  typeof getMoviesByUserResponseScheme
>;

export async function getMoviesByUser(
  userId: string,
  params: GetMoviesByUserParams,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetMoviesByUserResponse>> {
  const parsedParams = getMoviesByUserParamsScheme.parse(params);
  const url = setSearchParams(
    new URL(`${option.baseUrl}/users/${userId}/movies`),
    parsedParams
  );
  const res = await fetch(url.toString(), { headers: option.headers });
  return formatResponse<GetMoviesByUserResponse>(
    res,
    getMoviesByUserResponseScheme
  );
}

// ---- Get Current Live ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-current-live //
// -------------------------------------------------- //

const getCurrentLiveResponseScheme = z.looseObject({
  movie: movieScheme,
  broadcaster: userScheme,
  tags: z.array(z.string()),
});
export type GetCurrentLiveResponse = z.infer<
  typeof getCurrentLiveResponseScheme
>;

export async function getCurrentLive(
  userId: string,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetCurrentLiveResponse>> {
  const res = await fetch(`${option.baseUrl}/users/${userId}/current_live`, {
    headers: option.headers,
  });
  return formatResponse<GetCurrentLiveResponse>(
    res,
    getCurrentLiveResponseScheme
  );
}

// ---- Set Current Live Subtitle ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#set-current-live-subtitle //
// ----------------------------------------------------------- //

const setCurrentLiveSubtitleParamsScheme = z.object({
  subtitle: z.string().min(1).max(34),
});
export type SetCurrentLiveSubtitleParams = z.infer<
  typeof setCurrentLiveSubtitleParamsScheme
>;

const setCurrentLiveSubtitleResponseScheme = z.looseObject({
  movie_id: z.string(),
  subtitle: z.string(),
});
export type SetCurrentLiveSubtitleResponse = z.infer<
  typeof setCurrentLiveSubtitleResponseScheme
>;

export async function setCurrentLiveSubtitle(
  params: SetCurrentLiveSubtitleParams,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<SetCurrentLiveSubtitleResponse>> {
  const parsedParams = setCurrentLiveSubtitleParamsScheme.parse(params);
  const headers = new Headers(option.headers);
  headers.set("Content-Type", "application/json");
  const res = await fetch(`${option.baseUrl}/movies/subtitle`, {
    method: "POST",
    headers,
    body: JSON.stringify(parsedParams),
  });
  return formatResponse<SetCurrentLiveSubtitleResponse>(
    res,
    setCurrentLiveSubtitleResponseScheme
  );
}

// ---- Unset Current Live Subtitle ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#unset-current-live-subtitle //
// ------------------------------------------------------------- //

const unsetCurrentLiveSubtitleResponseScheme = z.looseObject({
  movie_id: z.string(),
  subtitle: z.null(),
});
export type UnsetCurrentLiveSubtitleResponse = z.infer<
  typeof unsetCurrentLiveSubtitleResponseScheme
>;

export async function unsetCurrentLiveSubtitle(
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<UnsetCurrentLiveSubtitleResponse>> {
  const res = await fetch(`${option.baseUrl}/movies/subtitle`, {
    method: "DELETE",
    headers: option.headers,
  });
  return formatResponse<UnsetCurrentLiveSubtitleResponse>(
    res,
    unsetCurrentLiveSubtitleResponseScheme
  );
}

// ---- Set Current Live Hashtag ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#set-current-live-hashtag //
// ---------------------------------------------------------- //

const setCurrentLiveHashtagParamsScheme = z.object({
  hashtag: z
    .string()
    .min(1)
    .max(26)
    .regex(/^[\p{L}\p{N}]+$/u, {
      message: "Hashtag can only contain letters and numbers.",
    }),
});
export type SetCurrentLiveHashtagParams = z.infer<
  typeof setCurrentLiveHashtagParamsScheme
>;

const setCurrentLiveHashtagResponseScheme = z.looseObject({
  movie_id: z.string(),
  hashtag: z.string(),
});
export type SetCurrentLiveHashtagResponse = z.infer<
  typeof setCurrentLiveHashtagResponseScheme
>;

export async function setCurrentLiveHashtag(
  params: SetCurrentLiveHashtagParams,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<SetCurrentLiveHashtagResponse>> {
  const parsedParams = setCurrentLiveHashtagParamsScheme.parse(params);
  const headers = new Headers(option.headers);
  headers.set("Content-Type", "application/json");
  const res = await fetch(`${option.baseUrl}/movies/hashtag`, {
    method: "POST",
    headers,
    body: JSON.stringify(parsedParams),
  });
  return formatResponse<SetCurrentLiveHashtagResponse>(
    res,
    setCurrentLiveHashtagResponseScheme
  );
}

// ---- Unset Current Live Hashtag ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#unset-current-live-hashtag //
// ------------------------------------------------------------ //

const unsetCurrentLiveHashtagResponseScheme = z.looseObject({
  movie_id: z.string(),
  hashtag: z.null(),
});
export type UnsetCurrentLiveHashtagResponse = z.infer<
  typeof unsetCurrentLiveHashtagResponseScheme
>;

export async function unsetCurrentLiveHashtag(
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<UnsetCurrentLiveHashtagResponse>> {
  const res = await fetch(`${option.baseUrl}/movies/hashtag`, {
    method: "DELETE",
    headers: option.headers,
  });
  return formatResponse<UnsetCurrentLiveHashtagResponse>(
    res,
    unsetCurrentLiveHashtagResponseScheme
  );
}
