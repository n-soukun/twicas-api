import { http, HttpResponse } from "msw";
import type {
  GetWebHookListResponse,
  RegisterWebHookResponse,
  RemoveWebHookResponse,
} from "../../../src/api/webHook";

const exampleGetWebHookListResponse = {
  all_count: 2,
  webhooks: [
    { user_id: "7134775954", event: "livestart" },
    { user_id: "7134775954", event: "liveend" },
  ],
};

const exampleRegisterWebHookResponse = {
  user_id: "7134775954",
  added_events: ["livestart", "liveend"],
};

const exampleRemoveWebHookResponse = {
  user_id: "7134775954",
  deleted_events: ["livestart", "liveend"],
};

export const webhookHandlers = [
  http.get<never, never, GetWebHookListResponse>("*/webhooks", () => {
    return HttpResponse.json(exampleGetWebHookListResponse);
  }),

  http.post<never, never, RegisterWebHookResponse>("*/webhooks", () => {
    return HttpResponse.json(exampleRegisterWebHookResponse);
  }),

  http.delete<never, never, RemoveWebHookResponse>("*/webhooks", () => {
    return HttpResponse.json(exampleRemoveWebHookResponse);
  }),
];
