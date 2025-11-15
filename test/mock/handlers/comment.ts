import { http, HttpResponse } from "msw";
import type {
  GetCommentsResponse,
  PostCommentResponse,
  DeleteCommentResponse,
} from "../../../src/api/comment";

const exampleGetCommentsResponse = {
  movie_id: "189037369",
  all_count: 2124,
  comments: [
    {
      id: "7134775954",
      message: "モイ！",
      from_user: {
        id: "182224938",
        screen_id: "twitcasting_jp",
        name: "ツイキャス公式",
        image:
          "http://202-234-44-53.moi.st/image3s/pbs.twimg.com/profile_images/613625726512705536/GLlBoXcS_normal.png",
        profile:
          "ツイキャスの公式アカウントです。ツイキャスに関するお知らせなどを投稿します。なお、お問い合わせは https://t.co/4gCf7XVm7N までお願いします。公式Facebookページhttps://t.co/bxYVwpzTJB\n公式Instagram\nhttps://t.co/Bm2O2J2Kfs",
        level: 24,
        last_movie_id: "189037369",
        is_live: false,
        supporter_count: 0,
        supporting_count: 0,
        created: 0,
      },
      created: 1479579471,
    },
  ],
};

const examplePostCommentResponse = {
  movie_id: "189037369",
  all_count: 2124,
  comment: {
    id: "7134775954",
    message: "モイ！",
    from_user: {
      id: "182224938",
      screen_id: "twitcasting_jp",
      name: "ツイキャス公式",
      image:
        "http://202-234-44-53.moi.st/image3s/pbs.twimg.com/profile_images/613625726512705536/GLlBoXcS_normal.png",
      profile:
        "ツイキャスの公式アカウントです。ツイキャスに関するお知らせなどを投稿します。なお、お問い合わせは https://t.co/4gCf7XVm7N までお願いします。公式Facebookページhttps://t.co/bxYVwpzTJB\n公式Instagram\nhttps://t.co/Bm2O2J2Kfs",
      level: 24,
      last_movie_id: "189037369",
      is_live: false,
      supporter_count: 0,
      supporting_count: 0,
      created: 0,
    },
    created: 1479579471,
  },
};

const exampleDeleteCommentResponse = {
  comment_id: "123456",
};

export const commentHandlers = [
  http.get<{ movie_id: string }, never, GetCommentsResponse>(
    "*/movies/:movie_id/comments",
    () => {
      return HttpResponse.json(exampleGetCommentsResponse);
    }
  ),
  http.post<{ movie_id: string }, never, PostCommentResponse>(
    "*/movies/:movie_id/comments",
    () => {
      return HttpResponse.json(examplePostCommentResponse);
    }
  ),
  http.delete<
    {
      movie_id: string;
      comment_id: string;
    },
    never,
    DeleteCommentResponse
  >("*/movies/:movie_id/comments/:comment_id", () => {
    return HttpResponse.json(exampleDeleteCommentResponse);
  }),
];
