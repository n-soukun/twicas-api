import z from "zod";
import { userScheme } from "../common/schema";
import { TwiCasAPIFetchOptions } from ".";
import { formatResponse, TwiCasAPIEndpointFnReturn } from "./common";

// ---- Get User Info ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-user-info //
// ----------------------------------------------- //

const getUserInfoResponseScheme = z.looseObject({
  user: userScheme,
  supporter_count: z.number(),
  supporting_count: z.number(),
});
export type GetUserInfoResponse = z.infer<typeof getUserInfoResponseScheme>;

export async function getUserInfo(
  userId: string,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetUserInfoResponse>> {
  const res = await fetch(`${option.baseUrl}/users/${userId}`, {
    headers: option.headers,
  });
  return formatResponse<GetUserInfoResponse>(res, getUserInfoResponseScheme);
}

// ---- Verify Credentials ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#verify-credentials //
// ---------------------------------------------------- //

const appScheme = z.looseObject({
  client_id: z.string(),
  name: z.string(),
  owner_user_id: z.string(),
});
export type App = z.infer<typeof appScheme>;

const verifyCredentialsResponseScheme = z.looseObject({
  app: appScheme,
  user: userScheme,
  supporter_count: z.number(),
  supporting_count: z.number(),
});
export type VerifyCredentialsResponse = z.infer<
  typeof verifyCredentialsResponseScheme
>;

export async function verifyCredentials(
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<VerifyCredentialsResponse>> {
  const res = await fetch(`${option.baseUrl}/verify_credentials`, {
    headers: option.headers,
  });
  return formatResponse<VerifyCredentialsResponse>(
    res,
    verifyCredentialsResponseScheme
  );
}
