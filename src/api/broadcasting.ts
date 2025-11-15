import type { AxiosInstance, AxiosResponse } from "axios";
import z from "zod";

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
  axios: AxiosInstance
): Promise<AxiosResponse<GetRTMPUrlResponse>> {
  const res = await axios.get(`/rtmp_url`);
  const parsedData = getRTMPUrlResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}
