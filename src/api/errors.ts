import { AxiosResponse } from "axios";
import z from "zod";

const errorScheme = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});

export class TwiCasAPIError extends Error {
  code: number;
  response: AxiosResponse;
  constructor(response: AxiosResponse) {
    const parsed = errorScheme.safeParse(response.data);
    if (parsed.success) {
      const { code, message } = parsed.data.error;
      super(message);
      this.name = "TwicasAPIError";
      this.code = code;
      this.response = response;
    } else {
      super("Unknown API error");
      this.name = "TwicasAPIError";
      this.code = -1;
      this.response = response;
    }
  }
}
