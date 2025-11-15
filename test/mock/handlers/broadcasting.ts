import { http, HttpResponse } from "msw";
import type { GetRTMPUrlResponse } from "../../../src/api/broadcasting";

const exampleGetRTMPUrlResponse: GetRTMPUrlResponse = {
  enabled: true,
  url: "rtmp://rtmp02.twitcasting.tv/publish_tool/twitcasting_jp?user=twitcasting_jp&key=this_is_secret_key&client_type=public_api&is_publisher_tool=1",
  stream_key: "twitcasting_jp",
};

export const broadcastingHandlers = [
  http.get<never, never, GetRTMPUrlResponse>("*/rtmp_url", () => {
    return HttpResponse.json(exampleGetRTMPUrlResponse);
  }),
];
