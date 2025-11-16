import z from "zod";

const errorScheme = z.object({
  error: z.object({
    code: z.number(),
    message: z.string(),
  }),
});

export class TwiCasAPIError extends Error {
  code: number;
  response: Response;
  constructor(data: unknown, res: Response) {
    const parsed = errorScheme.safeParse(data);
    if (parsed.success) {
      const { code, message } = parsed.data.error;
      super(message);
      this.name = "TwicasAPIError";
      this.code = code;
      this.response = res;
    } else {
      super("Unknown API error");
      this.name = "TwicasAPIError";
      this.code = -1;
      this.response = res;
    }
  }
}
