import type { AxiosInstance, AxiosResponse } from "axios";
import z from "zod";
import { giftScheme } from "../common/schema";

// ---- Get Gifts ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-gifts //
// ------------------------------------------- //

const getGiftsParamsScheme = z.object({
  slice_id: z.number().min(-1).default(-1),
});
export type GetGiftsParams = z.infer<typeof getGiftsParamsScheme>;

const getGiftsResponseScheme = z.looseObject({
  slice_id: z.number(),
  gifts: z.array(giftScheme),
});
export type GetGiftsResponse = z.infer<typeof getGiftsResponseScheme>;

export async function getGifts(
  params: GetGiftsParams,
  axios: AxiosInstance
): Promise<AxiosResponse<GetGiftsResponse>> {
  const parsedParams = getGiftsParamsScheme.parse(params);
  const res = await axios.get(`/gifts`, {
    params: parsedParams,
  });
  const parsedData = getGiftsResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}
