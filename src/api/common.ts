import z from "zod";
import { TwiCasAPIError, TwiCasAPIRateLimit } from ".";

export interface TwiCasAPIEndpointFnReturn<T> {
  data: T;
  rowResponse: Response;
  rateLimit: TwiCasAPIRateLimit;
}

export async function formatResponse<T>(
  res: Response,
  scheme: z.ZodType<T>
): Promise<TwiCasAPIEndpointFnReturn<T>> {
  const data = await res.json();

  if (!res.ok) {
    throw new TwiCasAPIError(data, res);
  }

  return {
    data: scheme.parse(data),
    rowResponse: res,
    rateLimit: {
      limit: Number(res.headers.get("X-Rate-Limit-Limit") ?? -1),
      remaining: Number(res.headers.get("X-Rate-Limit-Remaining") ?? -1),
      reset: Number(res.headers.get("X-Rate-Limit-Reset") ?? -1),
    },
  };
}
