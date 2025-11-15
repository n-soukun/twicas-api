import type { AxiosInstance, AxiosResponse } from "axios";
import z from "zod";
import { webHookScheme } from "../common/schema";

// ---- Get Categories ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-categories //
// ------------------------------------------------ //

const getWebHookListParamsScheme = z.object({
  limit: z.number().min(1).max(50).default(50),
  offset: z.number().min(0).default(0),
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
  axios: AxiosInstance
): Promise<AxiosResponse<GetWebHookListResponse>> {
  const parsedParams = getWebHookListParamsScheme.parse(params);
  const res = await axios.get(`/webhooks`, {
    params: parsedParams,
  });
  const parsedData = getWebHookListResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
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
  axios: AxiosInstance
): Promise<AxiosResponse<RegisterWebHookResponse>> {
  const parsedParams = registerWebHookParamsScheme.parse(params);
  const res = await axios.post(`/webhooks`, parsedParams);
  const parsedData = registerWebHookResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
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
  axios: AxiosInstance
): Promise<AxiosResponse<RemoveWebHookResponse>> {
  const parsedParams = removeWebHookParamsScheme.parse(params);
  const res = await axios.delete(`/webhooks`, {
    data: parsedParams,
  });
  const parsedData = removeWebHookResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}
