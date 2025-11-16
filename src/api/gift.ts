import z from "zod";
import { giftScheme } from "../common/schema";
import { TwiCasAPIFetchOptions } from ".";
import { formatResponse, TwiCasAPIEndpointFnReturn } from "./common";
import { setSearchParams } from "../utils";

// ---- Get Gifts ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-gifts //
// ------------------------------------------- //

const getGiftsParamsScheme = z.object({
  slice_id: z.number().min(-1).optional(),
});
export type GetGiftsParams = z.infer<typeof getGiftsParamsScheme>;

const getGiftsResponseScheme = z.looseObject({
  slice_id: z.number(),
  gifts: z.array(giftScheme),
});
export type GetGiftsResponse = z.infer<typeof getGiftsResponseScheme>;

export async function getGifts(
  params: GetGiftsParams,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetGiftsResponse>> {
  const parsedParams = getGiftsParamsScheme.parse(params);
  const url = setSearchParams(new URL(`${option.baseUrl}/gifts`), parsedParams);
  const res = await fetch(url.toString(), { headers: option.headers });
  return formatResponse<GetGiftsResponse>(res, getGiftsResponseScheme);
}
