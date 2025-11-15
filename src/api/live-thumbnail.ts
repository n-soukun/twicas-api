import type { AxiosInstance, AxiosResponse } from "axios";

// ---- Get Live Thumbnail Image ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-live-thumbnail-image //
// ---------------------------------------------------------- //

export function createLiveThumbnailUrl(
  userId: string,
  axios: AxiosInstance
): string {
  return axios.defaults.baseURL + `/users/${userId}/live/thumbnail`;
}

export async function getLiveThumbnailImage(
  userId: string,
  axios: AxiosInstance
): Promise<AxiosResponse> {
  // image/jpeg or image/png
  const res = await axios.get(`/users/${userId}/live/thumbnail`);
  return res;
}
