import { Emitter } from "strict-event-emitter";

import { WebhookPayload, webhookPayloadScheme } from "../common/schema";

export type EventSubEvents = {
  received: [data: WebhookPayload];
};

export class BaseWebHookReceiver extends Emitter<EventSubEvents> {
  private _signature: string;
  constructor(signature: string) {
    super();
    this._signature = signature;
  }

  protected receivePayload(payload: unknown): Response {
    const parsed = webhookPayloadScheme.safeParse(payload);
    if (!parsed.success) {
      return new Response("Forbidden", { status: 403 });
    }
    if (parsed.data.signature !== this._signature) {
      return new Response("Forbidden", { status: 403 });
    }
    this.emit("received", parsed.data);
    return new Response(undefined, { status: 204 });
  }
}
