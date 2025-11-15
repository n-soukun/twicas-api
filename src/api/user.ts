import type { AxiosInstance, AxiosResponse } from "axios";
import z from "zod";
import { userScheme } from "../common/schema";

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
  axios: AxiosInstance
): Promise<AxiosResponse<GetUserInfoResponse>> {
  const res = await axios.get(`/users/${userId}`);
  const parsedData = getUserInfoResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
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
  axios: AxiosInstance
): Promise<AxiosResponse<VerifyCredentialsResponse>> {
  const res = await axios.get(`/verify_credentials`);
  const parsedData = verifyCredentialsResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}
