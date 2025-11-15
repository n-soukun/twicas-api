import type { AxiosInstance, AxiosResponse } from "axios";
import z from "zod";
import { userScheme, supporterUserScheme } from "../common/schema";

// ---- Get Supporting Status ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-supporting-status //
// ------------------------------------------------------- //

const getSupportingStatusParamsScheme = z.object({
  target_user_id: z.string(),
});
export type GetSupportingStatusParams = z.infer<
  typeof getSupportingStatusParamsScheme
>;

const getSupportingStatusResponseScheme = z.looseObject({
  is_supporting: z.boolean(),
  supported: z.number(),
  target_user: userScheme,
});
export type GetSupportingStatusResponse = z.infer<
  typeof getSupportingStatusResponseScheme
>;

export async function getSupportingStatus(
  userId: string,
  params: GetSupportingStatusParams,
  axios: AxiosInstance
): Promise<AxiosResponse<GetSupportingStatusResponse>> {
  const parsedParams = getSupportingStatusParamsScheme.parse(params);
  const res = await axios.get(`/users/${userId}/supporting_status`, {
    params: parsedParams,
  });
  const parsedData = getSupportingStatusResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}

// ---- Support User ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#support-user //
// ---------------------------------------------- //

const supportUserParamsScheme = z.object({
  target_user_ids: z.array(z.string()).min(1).max(20),
});
export type SupportUserParams = z.infer<typeof supportUserParamsScheme>;

const supportUserResponseScheme = z.looseObject({
  added_count: z.number(),
});
export type SupportUserResponse = z.infer<typeof supportUserResponseScheme>;

export async function supportUser(
  params: SupportUserParams,
  axios: AxiosInstance
): Promise<AxiosResponse<SupportUserResponse>> {
  const parsedParams = supportUserParamsScheme.parse(params);
  const res = await axios.put(`/support`, parsedParams);
  const parsedData = supportUserResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}

// ---- Unsupport User ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#unsupport-user //
// ------------------------------------------------ //

const unsupportUserParamsScheme = z.object({
  target_user_ids: z.array(z.string()).min(1).max(20),
});
export type UnsupportUserParams = z.infer<typeof unsupportUserParamsScheme>;

const unsupportUserResponseScheme = z.looseObject({
  removed_count: z.number(),
});
export type UnsupportUserResponse = z.infer<typeof unsupportUserResponseScheme>;

export async function unsupportUser(
  params: UnsupportUserParams,
  axios: AxiosInstance
): Promise<AxiosResponse<UnsupportUserResponse>> {
  const parsedParams = unsupportUserParamsScheme.parse(params);
  const res = await axios.put(`/unsupport`, parsedParams);
  const parsedData = unsupportUserResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}

// ---- Supporting List ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#supporting-list //
// ------------------------------------------------- //

const getSupportingListParamsScheme = z.object({
  offset: z.number().min(0).default(0),
  limit: z.number().min(1).max(20).default(20),
});
export type GetSupportingListParams = z.infer<
  typeof getSupportingListParamsScheme
>;

const getSupportingListResponseScheme = z.looseObject({
  total: z.number(),
  supporting: z.array(supporterUserScheme),
});
export type GetSupportingListResponse = z.infer<
  typeof getSupportingListResponseScheme
>;

export async function getSupportingList(
  userId: string,
  params: GetSupportingListParams,
  axios: AxiosInstance
): Promise<AxiosResponse<GetSupportingListResponse>> {
  const parsedParams = getSupportingListParamsScheme.parse(params);
  const res = await axios.get(`/users/${userId}/supporting`, {
    params: parsedParams,
  });
  const parsedData = getSupportingListResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}

// ---- Supporter List ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#supporter-list //
// ------------------------------------------------ //

const getSupporterListParamsScheme = z.object({
  offset: z.number().min(0).default(0),
  limit: z.number().min(1).max(20).default(20),
  sort: z.enum(["new", "ranking"]),
});
export type GetSupporterListParams = z.infer<
  typeof getSupporterListParamsScheme
>;

const getSupporterListResponseScheme = z.looseObject({
  total: z.number(),
  supporters: z.array(supporterUserScheme),
});
export type GetSupporterListResponse = z.infer<
  typeof getSupporterListResponseScheme
>;

export async function getSupporterList(
  userId: string,
  params: GetSupporterListParams,
  axios: AxiosInstance
): Promise<AxiosResponse<GetSupporterListResponse>> {
  const parsedParams = getSupporterListParamsScheme.parse(params);
  const res = await axios.get(`/users/${userId}/supporters`, {
    params: parsedParams,
  });
  const parsedData = getSupporterListResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}
