import z from "zod";
import { categoryScheme } from "../common/schema";
import { TwiCasAPIFetchOptions } from ".";
import { formatResponse, TwiCasAPIEndpointFnReturn } from "./common";
import { setSearchParams } from "../utils";

// ---- Get Categories ---------------------------- //
// https://apiv2-doc.twitcasting.tv/#get-categories //
// ------------------------------------------------ //

const getCategoriesParamsScheme = z.object({
  lang: z.enum(["ja", "en"]),
});
export type GetCategoriesParams = z.infer<typeof getCategoriesParamsScheme>;

const getCategoriesResponseScheme = z.looseObject({
  categories: z.array(categoryScheme),
});
export type GetCategoriesResponse = z.infer<typeof getCategoriesResponseScheme>;

export async function getCategories(
  params: GetCategoriesParams,
  option: TwiCasAPIFetchOptions
): Promise<TwiCasAPIEndpointFnReturn<GetCategoriesResponse>> {
  const parsedParams = getCategoriesParamsScheme.parse(params);
  const url = setSearchParams(
    new URL(`${option.baseUrl}/categories`),
    parsedParams
  );
  const res = await fetch(url.toString(), { headers: option.headers });
  return formatResponse<GetCategoriesResponse>(
    res,
    getCategoriesResponseScheme
  );
}
