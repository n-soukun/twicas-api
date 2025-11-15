import { http, HttpResponse } from "msw";
import type {
  GetSupportingStatusResponse,
  SupportUserResponse,
  UnsupportUserResponse,
  GetSupportingListResponse,
  GetSupporterListResponse,
  SupportUserParams,
  UnsupportUserParams,
} from "../../../src/api/supporter";

const exampleGetSupportingStatusResponse = {
  is_supporting: true,
  supported: 1632716873,
  target_user: {
    id: "3160885238",
    screen_id: "casma_jp",
    name: "キャスマ公式",
    image:
      "http://202-234-44-53.moi.st/image3s/pbs.twimg.com/profile_images/590410593330311169/b_mp4n9v_normal.png",
    profile:
      "キャスマーケットの公式アカウントです。キャスマに関するサポート対応、キャスマに並んでいる商品の紹介をしています。",
    level: 26,
    last_movie_id: null,
    is_live: false,
    supporter_count: 0,
    supporting_count: 0,
    created: 0,
  },
};

const exampleSupportUserResponse = {
  added_count: 2,
};

const exampleUnsupportUserResponse = {
  removed_count: 2,
};

const exampleGetSupportingListResponse = {
  total: 1234,
  supporting: [
    {
      id: "182224938",
      screen_id: "twitcasting_jp",
      name: "ツイキャス公式",
      image:
        "http://202-234-44-53.moi.st/image3s/pbs.twimg.com/profile_images/613625726512705536/GLlBoXcS_normal.png",
      profile:
        "ツイキャスの公式アカウントです。ツイキャスに関するお知らせなどを投稿します。なお、お問い合わせは https://t.co/4gCf7XVm7N までお願いします。公式Facebookページhttps://t.co/bxYVwpzTJB\n公式Instagram\nhttps://t.co/Bm2O2J2Kfs",
      level: 24,
      last_movie_id: "189037369",
      is_live: true,
      supported: 1632716873,
      supporter_count: 0,
      supporting_count: 0,
      created: 0,
      point: 15,
      total_point: 300,
    },
    {
      id: "2880417757",
      screen_id: "twitcasting_pr",
      name: "ツイキャス運営事務局",
      image:
        "http://202-234-44-61.moi.st/image3s/pbs.twimg.com/profile_images/740857980137050112/4sIEkzV8_normal.jpg",
      profile:
        "モイ！ ツイキャスを運営しているモイ株式会社広報担当のアカウントです。公式アカウントはこちら！　@twitcasting_jp",
      level: 23,
      last_movie_id: "323387579",
      is_live: false,
      supported: 1632716873,
      supporter_count: 0,
      supporting_count: 0,
      created: 0,
      point: 30,
      total_point: 45,
    },
  ],
};

const exampleGetSupporterListResponse = {
  total: 1234,
  supporters: [
    {
      id: "182224938",
      screen_id: "twitcasting_jp",
      name: "ツイキャス公式",
      image:
        "http://202-234-44-53.moi.st/image3s/pbs.twimg.com/profile_images/613625726512705536/GLlBoXcS_normal.png",
      profile:
        "ツイキャスの公式アカウントです。ツイキャスに関するお知らせなどを投稿します。なお、お問い合わせは https://t.co/4gCf7XVm7N までお願いします。公式Facebookページhttps://t.co/bxYVwpzTJB\n公式Instagram\nhttps://t.co/Bm2O2J2Kfs",
      level: 24,
      last_movie_id: "189037369",
      is_live: true,
      supported: 1632716873,
      supporter_count: 0,
      supporting_count: 0,
      created: 0,
      point: 15,
      total_point: 300,
    },
    {
      id: "2880417757",
      screen_id: "twitcasting_pr",
      name: "ツイキャス運営事務局",
      image:
        "http://202-234-44-61.moi.st/image3s/pbs.twimg.com/profile_images/740857980137050112/4sIEkzV8_normal.jpg",
      profile:
        "モイ！ ツイキャスを運営しているモイ株式会社広報担当のアカウントです。公式アカウントはこちら！　@twitcasting_jp",
      level: 23,
      last_movie_id: "323387579",
      is_live: false,
      supported: 1632716873,
      supporter_count: 0,
      supporting_count: 0,
      created: 0,
      point: 30,
      total_point: 45,
    },
  ],
};

export const supporterHandlers = [
  http.get<
    {
      user_id: string;
    },
    never,
    GetSupportingStatusResponse
  >("*/users/:user_id/supporting_status", () => {
    return HttpResponse.json(exampleGetSupportingStatusResponse);
  }),

  http.put<never, SupportUserParams, SupportUserResponse>("*/support", () => {
    return HttpResponse.json(exampleSupportUserResponse);
  }),
  http.put<never, UnsupportUserParams, UnsupportUserResponse>(
    "*/unsupport",
    () => {
      return HttpResponse.json(exampleUnsupportUserResponse);
    }
  ),

  http.get<
    {
      user_id: string;
    },
    never,
    GetSupportingListResponse
  >("*/users/:user_id/supporting", () => {
    return HttpResponse.json(exampleGetSupportingListResponse);
  }),

  http.get<
    {
      user_id: string;
    },
    never,
    GetSupporterListResponse
  >("*/users/:user_id/supporters", () => {
    return HttpResponse.json(exampleGetSupporterListResponse);
  }),
];
