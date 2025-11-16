import z from "zod";
import { userScheme, supporterUserScheme } from "../common/schema";
import { TwiCasAPIFetchOptions } from ".";
import { formatResponse, TwiCasAPIEndpointFnReturn } from "./common";
import { setSearchParams } from "../utils";

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
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetSupportingStatusResponse>> {
  const parsedParams = getSupportingStatusParamsScheme.parse(params);
  const url = setSearchParams(
    new URL(`${option.baseUrl}/users/${userId}/supporting_status`),
    parsedParams
  );
  const res = await fetch(url.toString(), { headers: option.headers });
  return formatResponse<GetSupportingStatusResponse>(
    res,
    getSupportingStatusResponseScheme
  );
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
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<SupportUserResponse>> {
  const parsedParams = supportUserParamsScheme.parse(params);
  const headers = new Headers(option.headers);
  headers.set("Content-Type", "application/json");
  const res = await fetch(`${option.baseUrl}/support`, {
    method: "PUT",
    headers,
    body: JSON.stringify(parsedParams),
  });
  return formatResponse<SupportUserResponse>(res, supportUserResponseScheme);
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
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<UnsupportUserResponse>> {
  const parsedParams = unsupportUserParamsScheme.parse(params);
  const headers = new Headers(option.headers);
  headers.set("Content-Type", "application/json");
  const res = await fetch(`${option.baseUrl}/unsupport`, {
    method: "PUT",
    headers,
    body: JSON.stringify(parsedParams),
  });
  return formatResponse<UnsupportUserResponse>(
    res,
    unsupportUserResponseScheme
  );
}

// ---- Supporting List ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#supporting-list //
// ------------------------------------------------- //

const getSupportingListParamsScheme = z.object({
  offset: z.number().min(0).optional(),
  limit: z.number().min(1).max(20).optional(),
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
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetSupportingListResponse>> {
  const parsedParams = getSupportingListParamsScheme.parse(params);
  const url = setSearchParams(
    new URL(`${option.baseUrl}/users/${userId}/supporting`),
    parsedParams
  );
  const res = await fetch(url.toString(), { headers: option.headers });
  return formatResponse<GetSupportingListResponse>(
    res,
    getSupportingListResponseScheme
  );
}

// ---- Supporter List ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#supporter-list //
// ------------------------------------------------ //

const getSupporterListParamsScheme = z.object({
  offset: z.number().min(0).optional(),
  limit: z.number().min(1).max(20).optional(),
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
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetSupporterListResponse>> {
  const parsedParams = getSupporterListParamsScheme.parse(params);
  const url = setSearchParams(
    new URL(`${option.baseUrl}/users/${userId}/supporters`),
    parsedParams
  );
  const res = await fetch(url.toString(), { headers: option.headers });
  return formatResponse<GetSupporterListResponse>(
    res,
    getSupporterListResponseScheme
  );
}
