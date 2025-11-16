import z from "zod";
import { webHookScheme } from "../common/schema";
import { TwiCasAPIFetchOptions } from ".";
import { formatResponse, TwiCasAPIEndpointFnReturn } from "./common";
import { setSearchParams } from "../utils";

// ---- Get WebHook List ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-webhook-list //
// -------------------------------------------------- //

const getWebHookListParamsScheme = z.object({
  limit: z.number().min(1).max(50).optional(),
  offset: z.number().min(0).optional(),
  user_id: z.string().optional(),
});
export type GetWebHookListParams = z.infer<typeof getWebHookListParamsScheme>;

const getWebHookListResponseScheme = z.looseObject({
  all_count: z.number(),
  webhooks: z.array(webHookScheme),
});
export type GetWebHookListResponse = z.infer<
  typeof getWebHookListResponseScheme
>;

export async function getWebHookList(
  params: GetWebHookListParams,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetWebHookListResponse>> {
  const parsedParams = getWebHookListParamsScheme.parse(params);
  const url = setSearchParams(
    new URL(`${option.baseUrl}/webhooks`),
    parsedParams
  );
  const res = await fetch(url.toString(), { headers: option.headers });
  return formatResponse<GetWebHookListResponse>(
    res,
    getWebHookListResponseScheme
  );
}

// ---- Register WebHook ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#register-webhook //
// -------------------------------------------------- //

const registerWebHookParamsScheme = z.object({
  user_id: z.string(),
  events: z.array(z.string()),
});
export type RegisterWebHookParams = z.infer<typeof registerWebHookParamsScheme>;

const registerWebHookResponseScheme = z.looseObject({
  user_id: z.string(),
  added_events: z.array(z.string()),
});
export type RegisterWebHookResponse = z.infer<
  typeof registerWebHookResponseScheme
>;

export async function registerWebHook(
  params: RegisterWebHookParams,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<RegisterWebHookResponse>> {
  const parsedParams = registerWebHookParamsScheme.parse(params);
  const headers = new Headers(option.headers);
  headers.set("Content-Type", "application/json");
  const res = await fetch(`${option.baseUrl}/webhooks`, {
    method: "POST",
    headers,
    body: JSON.stringify(parsedParams),
  });
  return formatResponse<RegisterWebHookResponse>(
    res,
    registerWebHookResponseScheme
  );
}

// ---- Remove WebHook ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#remove-webhook //
// ------------------------------------------------ //

const removeWebHookParamsScheme = z.object({
  user_id: z.string(),
  events: z.array(z.string()),
});
export type RemoveWebHookParams = z.infer<typeof removeWebHookParamsScheme>;

const removeWebHookResponseScheme = z.looseObject({
  user_id: z.string(),
  deleted_events: z.array(z.string()),
});
export type RemoveWebHookResponse = z.infer<typeof removeWebHookResponseScheme>;

export async function removeWebHook(
  params: RemoveWebHookParams,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<RemoveWebHookResponse>> {
  const parsedParams = removeWebHookParamsScheme.parse(params);
  const headers = new Headers(option.headers);
  headers.set("Content-Type", "application/json");
  const res = await fetch(`${option.baseUrl}/webhooks`, {
    method: "DELETE",
    headers,
    body: JSON.stringify(parsedParams),
  });
  return formatResponse<RemoveWebHookResponse>(
    res,
    removeWebHookResponseScheme
  );
}
