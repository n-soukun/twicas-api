import { TwiCasAPIFetchOptions } from ".";

// ---- Get Live Thumbnail Image ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-live-thumbnail-image //
// ---------------------------------------------------------- //

export function createLiveThumbnailUrl(
  userId: string,
  option: TwiCasAPIFetchOptions
): string {
  return `${option.baseUrl}/users/${userId}/live/thumbnail`;
}

export async function getLiveThumbnailImage(
  userId: string,
  option: TwiCasAPIFetchOptions
): Promise<Response> {
  // image/jpeg or image/png
  const res = await fetch(`${option.baseUrl}/users/${userId}/live/thumbnail`, {
    headers: option.headers,
  });
  return res;
}
