import z from "zod";
import { TwiCasAPIFetchOptions } from ".";
import { formatResponse, TwiCasAPIEndpointFnReturn } from "./common";

// ---- Get RTMP Url ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-rtmp-url //
// ---------------------------------------------- //

const getRTMPUrlResponseScheme = z.looseObject({
  enabled: z.boolean(),
  url: z.string().nullish(),
  stream_key: z.string().nullish(),
});
export type GetRTMPUrlResponse = z.infer<typeof getRTMPUrlResponseScheme>;

export async function getRTMPUrl(
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetRTMPUrlResponse>> {
  const res = await fetch(`${option.baseUrl}/rtmp_url`, {
    headers: option.headers,
  });
  return formatResponse<GetRTMPUrlResponse>(res, getRTMPUrlResponseScheme);
}
