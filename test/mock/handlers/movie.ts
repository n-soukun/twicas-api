import { http, HttpResponse } from "msw";
import {
  GetMovieInfoResponse,
  GetMoviesByUserResponse,
  GetCurrentLiveResponse,
  SetCurrentLiveSubtitleResponse,
  UnsetCurrentLiveSubtitleResponse,
  SetCurrentLiveHashtagResponse,
  UnsetCurrentLiveHashtagResponse,
} from "../../../src/api/movie";

const exampleGetMovieInfoResponse = {
  movie: {
    id: "189037369",
    user_id: "182224938",
    title: "ライブ #189037369",
    subtitle: "ライブ配信中！",
    last_owner_comment: "もいもい",
    category: "girls_jcjk_jp",
    link: "http://twitcasting.tv/twitcasting_jp/movie/189037369",
    is_live: false,
    is_recorded: false,
    comment_count: 2124,
    large_thumbnail:
      "http://202-230-12-92.twitcasting.tv/image3/image.twitcasting.tv/image55_1/39/7b/0b447b39-1.jpg",
    small_thumbnail:
      "http://202-230-12-92.twitcasting.tv/image3/image.twitcasting.tv/image55_1/39/7b/0b447b39-1-s.jpg",
    country: "jp",
    duration: 1186,
    created: 1438500282,
    is_collabo: false,
    is_protected: false,
    max_view_count: 1675,
    current_view_count: 20848,
    total_view_count: 20848,
    hls_url: "https://twitcasting.tv/twitcasting_jp/metastream.m3u8/?video=1",
  },
  broadcaster: {
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
    supporter_count: 0,
    supporting_count: 0,
    created: 0,
  },
  tags: [
    "人気",
    "コンティニュー中",
    "レベル40+",
    "初見さん大歓迎",
    "まったり",
    "雑談",
  ],
};

const exampleGetMoviesByUserResponse = {
  total_count: 5,
  movies: [
    {
      id: "323387579",
      user_id: "2880417757",
      title: "ライブ #323387579",
      subtitle: "ライブ配信中！",
      last_owner_comment: "こんにちは",
      category: "girls_jcjk_jp",
      link: "http://twitcasting.tv/twitcasting_pr/movie/323387579",
      is_live: false,
      is_recorded: false,
      comment_count: 64,
      large_thumbnail:
        "http://202-230-12-93.twitcasting.tv/image3/image.twitcasting.tv/image57_1/bb/80/134680bb-1.jpg",
      small_thumbnail:
        "http://202-230-12-93.twitcasting.tv/image3/image.twitcasting.tv/image57_1/bb/80/134680bb-1-s.jpg",
      country: "jp",
      duration: 995,
      created: 1479379075,
      is_collabo: false,
      is_protected: false,
      max_view_count: 22,
      current_view_count: 71,
      total_view_count: 71,
      hls_url: "https://twitcasting.tv/twitcasting_pr/metastream.m3u8/?video=1",
    },
    {
      id: "189037369",
      user_id: "182224938",
      title: "ライブ #189037369",
      subtitle: "ライブ配信中！",
      last_owner_comment: "もいもい",
      category: "girls_jcjk_jp",
      link: "http://twitcasting.tv/twitcasting_jp/movie/189037369",
      is_live: false,
      is_recorded: false,
      comment_count: 2124,
      large_thumbnail:
        "http://202-230-12-92.twitcasting.tv/image3/image.twitcasting.tv/image55_1/39/7b/0b447b39-1.jpg",
      small_thumbnail:
        "http://202-230-12-92.twitcasting.tv/image3/image.twitcasting.tv/image55_1/39/7b/0b447b39-1-s.jpg",
      country: "jp",
      duration: 1186,
      created: 1438500282,
      is_collabo: false,
      is_protected: false,
      max_view_count: 1675,
      current_view_count: 20848,
      total_view_count: 20848,
      hls_url: "https://twitcasting.tv/twitcasting_jp/metastream.m3u8/?video=1",
    },
  ],
};

const exampleGetCurrentLiveResponse = {
  movie: {
    id: "189037369",
    user_id: "182224938",
    title: "ライブ #189037369",
    subtitle: "ライブ配信中！",
    last_owner_comment: "もいもい",
    category: "girls_jcjk_jp",
    link: "http://twitcasting.tv/twitcasting_jp/movie/189037369",
    is_live: true,
    is_recorded: false,
    comment_count: 2124,
    large_thumbnail:
      "http://202-230-12-92.twitcasting.tv/image3/image.twitcasting.tv/image55_1/39/7b/0b447b39-1.jpg",
    small_thumbnail:
      "http://202-230-12-92.twitcasting.tv/image3/image.twitcasting.tv/image55_1/39/7b/0b447b39-1-s.jpg",
    country: "jp",
    duration: 1186,
    created: 1438500282,
    is_collabo: false,
    is_protected: false,
    max_view_count: 1675,
    current_view_count: 20848,
    total_view_count: 20848,
    hls_url: "https://twitcasting.tv/twitcasting_jp/metastream.m3u8/?video=1",
  },
  broadcaster: {
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
    supporter_count: 0,
    supporting_count: 0,
    created: 0,
  },
  tags: [
    "人気",
    "コンティニュー中",
    "レベル40+",
    "初見さん大歓迎",
    "まったり",
    "雑談",
  ],
};

const exampleSetCurrentLiveSubtitleResponse = {
  movie_id: "323387579",
  subtitle: "初見さん大歓迎！",
};

const exampleUnsetCurrentLiveSubtitleResponse = {
  movie_id: "323387579",
  subtitle: null,
};

const exampleSetCurrentLiveHashtagResponse = {
  movie_id: "323387579",
  hashtag: "#初見さん大歓迎",
};

const exampleUnsetCurrentLiveHashtagResponse = {
  movie_id: "323387579",
  hashtag: null,
};

export const movieHandlers = [
  http.get<{ movieId: string }, never, GetMovieInfoResponse>(
    "*/movies/:movieId",
    () => {
      return HttpResponse.json(exampleGetMovieInfoResponse);
    }
  ),

  http.get<{ userId: string }, never, GetMoviesByUserResponse>(
    "*/users/:userId/movies",
    () => {
      return HttpResponse.json(exampleGetMoviesByUserResponse);
    }
  ),

  http.get<{ userId: string }, never, GetCurrentLiveResponse>(
    "*/users/:userId/current_live",
    () => {
      return HttpResponse.json(exampleGetCurrentLiveResponse);
    }
  ),

  http.post<never, { subtitle: string }, SetCurrentLiveSubtitleResponse>(
    "*/movies/subtitle",
    () => {
      return HttpResponse.json(exampleSetCurrentLiveSubtitleResponse);
    }
  ),

  http.delete<never, never, UnsetCurrentLiveSubtitleResponse>(
    "*/movies/subtitle",
    () => {
      return HttpResponse.json(exampleUnsetCurrentLiveSubtitleResponse);
    }
  ),

  http.post<never, { hashtag: string }, SetCurrentLiveHashtagResponse>(
    "*/movies/hashtag",
    () => {
      return HttpResponse.json(exampleSetCurrentLiveHashtagResponse);
    }
  ),

  http.delete<never, never, UnsetCurrentLiveHashtagResponse>(
    "*/movies/hashtag",
    () => {
      return HttpResponse.json(exampleUnsetCurrentLiveHashtagResponse);
    }
  ),
];
