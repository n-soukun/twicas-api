import type { AxiosInstance, AxiosResponse } from "axios";
import z from "zod";
import { categoryScheme } from "../common/schema";

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
  axios: AxiosInstance
): Promise<AxiosResponse<GetCategoriesResponse>> {
  const parsedParams = getCategoriesParamsScheme.parse(params);
  const res = await axios.get(`/categories`, {
    params: parsedParams,
  });
  const parsedData = getCategoriesResponseScheme.parse(res.data);
  return {
    ...res,
    data: parsedData,
  };
}
