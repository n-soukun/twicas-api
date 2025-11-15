import type { AxiosInstance, AxiosResponse } from "axios";
import z from "zod";
import { movieScheme, userScheme } from "../common/schema";

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
  axios: AxiosInstance
): Promise<AxiosResponse<GetMovieInfoResponse>> {
  const res = await axios.get(`/movies/${movieId}`);
  const parsedData = getMovieInfoResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}

// ---- Get Movies by User ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-movies-by-user //
// ---------------------------------------------------- //

const getMoviesByUserParamsScheme = z.object({
  offset: z.number().min(0).max(1000).default(0),
  limit: z.number().min(1).max(50).default(20),
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
  axios: AxiosInstance
): Promise<AxiosResponse<GetMoviesByUserResponse>> {
  const parsedParams = getMoviesByUserParamsScheme.parse(params);
  const res = await axios.get(`/users/${userId}/movies`, {
    params: parsedParams,
  });
  const parsedData = getMoviesByUserResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
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
  axios: AxiosInstance
): Promise<AxiosResponse<GetCurrentLiveResponse>> {
  const res = await axios.get(`/users/${userId}/current_live`);
  const parsedData = getCurrentLiveResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
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
  axios: AxiosInstance
): Promise<AxiosResponse<SetCurrentLiveSubtitleResponse>> {
  const parsedParams = setCurrentLiveSubtitleParamsScheme.parse(params);
  const res = await axios.post(`/movies/subtitle`, parsedParams);
  const parsedData = setCurrentLiveSubtitleResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
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
  axios: AxiosInstance
): Promise<AxiosResponse<UnsetCurrentLiveSubtitleResponse>> {
  const res = await axios.delete(`/movies/subtitle`);
  const parsedData = unsetCurrentLiveSubtitleResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
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
  axios: AxiosInstance
): Promise<AxiosResponse<SetCurrentLiveHashtagResponse>> {
  const parsedParams = setCurrentLiveHashtagParamsScheme.parse(params);
  const res = await axios.post(`/movies/hashtag`, parsedParams);
  const parsedData = setCurrentLiveHashtagResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
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
  axios: AxiosInstance
): Promise<AxiosResponse<UnsetCurrentLiveHashtagResponse>> {
  const res = await axios.delete(`/movies/hashtag`);
  const parsedData = unsetCurrentLiveHashtagResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}
