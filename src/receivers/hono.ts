import { Context } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { BaseWebHookReceiver } from "./base";

export class TwiCasWebHookReceiver extends BaseWebHookReceiver {
  handleRequest(c: Context) {
    const response = this.receivePayload(c.req.json());
    c.status(response.status as StatusCode);
    return c.body(response.body || "");
  }
}
