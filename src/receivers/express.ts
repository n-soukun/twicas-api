import type { Request, Response } from "express";
import { WebHookReceiver } from "./base";

export class ExpressWebHookReceiver extends WebHookReceiver {
  handleRequest(req: Request, res: Response) {
    const response = this.receivePayload(req.body);
    res.status(response.status);
    res.send(response.body);
  }
}
