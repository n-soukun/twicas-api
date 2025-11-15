import type { Request, Response } from "express";
import { BaseWebHookReceiver } from "./base";

export class TwiCasWebHookReceiver extends BaseWebHookReceiver {
  handleRequest(req: Request, res: Response) {
    const response = this.receivePayload(req.body);
    res.status(response.status);
    res.send(response.body);
  }
}
