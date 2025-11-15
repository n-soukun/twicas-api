import axios, { AxiosResponse } from "axios";

import { getUserInfo, verifyCredentials } from "./user";
import {
  createLiveThumbnailUrl,
  getLiveThumbnailImage,
} from "./live-thumbnail";
import {
  getMovieInfo,
  getMoviesByUser,
  getCurrentLive,
  setCurrentLiveSubtitle,
  unsetCurrentLiveSubtitle,
  setCurrentLiveHashtag,
  unsetCurrentLiveHashtag,
  SetCurrentLiveSubtitleParams,
  SetCurrentLiveHashtagParams,
} from "./movie";
import {
  getComments,
  postComment,
  deleteComment,
  GetCommentsParams,
  PostCommentParams,
} from "./comment";
import { getGifts, GetGiftsParams } from "./gift";
import {
  getSupportingStatus,
  supportUser,
  unsupportUser,
  getSupportingList,
  getSupporterList,
  SupportUserParams,
  UnsupportUserParams,
  GetSupportingListParams,
  GetSupporterListParams,
} from "./supporter";

import { toBase64 } from "../utils";

export interface TwiCasAPIRateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

export type TwiCasClientOptions = {
  encoding?: "gzip";
} & (
  | {
      accessToken: string;
    }
  | {
      clientId: string;
      clientSecret: string;
    }
);

export class TwiCasClient {
  baseUrl: string = "https://apiv2.twitcasting.tv";
  private _axiosInstance;

  constructor(options: TwiCasClientOptions) {
    let authorization;
    if ("accessToken" in options) {
      authorization = `Bearer ${options.accessToken}`;
    } else if (options.clientId && options.clientSecret) {
      const token = toBase64(`${options.clientId}:${options.clientSecret}`);
      authorization = `Basic ${token}`;
    } else {
      throw new Error(
        "Either accessToken or clientId and clientSecret must be provided"
      );
    }

    this._axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "X-Api-Version": "2.0",
        Authorization: authorization,
      },
    });

    if (options.encoding === "gzip") {
      this._axiosInstance.defaults.headers["Accept-Encoding"] = "gzip";
    }
  }

  private _extractRateLimit<T extends AxiosResponse>(
    res: T
  ): TwiCasAPIRateLimit {
    const rateLimit = {
      limit: Number(res.headers["X-RateLimit-Limit"]),
      remaining: Number(res.headers["X-RateLimit-Remaining	"]),
      reset: Number(res.headers["X-RateLimit-Reset"]),
    };
    return rateLimit;
  }

  private _toReturnFormat<T extends AxiosResponse>(res: T) {
    {
      const rateLimit = this._extractRateLimit(res);
      return {
        data: res.data as T["data"],
        rateLimit,
        rowResponse: res,
      };
    }
  }

  async getUserInfo(userId: string) {
    const res = await getUserInfo(userId, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async verifyCredentials() {
    const res = await verifyCredentials(this._axiosInstance);
    return this._toReturnFormat(res);
  }

  createLiveThumbnailUrl(userId: string): string {
    return createLiveThumbnailUrl(userId, this._axiosInstance);
  }

  async getLiveThumbnailImage(userId: string) {
    const res = await getLiveThumbnailImage(userId, this._axiosInstance);

    // このエンドポイントはレートリミットなし
    return {
      data: res.data,
      rowResponse: res,
    };
  }

  async getMovieInfo(movieId: string) {
    const res = await getMovieInfo(movieId, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async getMoviesByUser(
    userId: string,
    params: Parameters<typeof getMoviesByUser>[1]
  ) {
    const res = await getMoviesByUser(userId, params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async getCurrentLive(userId: string) {
    const res = await getCurrentLive(userId, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async setCurrentLiveSubtitle(params: SetCurrentLiveSubtitleParams) {
    const res = await setCurrentLiveSubtitle(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async unsetCurrentLiveSubtitle() {
    const res = await unsetCurrentLiveSubtitle(this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async setCurrentLiveHashtag(params: SetCurrentLiveHashtagParams) {
    const res = await setCurrentLiveHashtag(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async unsetCurrentLiveHashtag() {
    const res = await unsetCurrentLiveHashtag(this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async getComments(movieId: string, params: GetCommentsParams) {
    const res = await getComments(movieId, params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async postComment(movieId: string, params: PostCommentParams) {
    const res = await postComment(movieId, params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async deleteComment(movieId: string, commentId: string) {
    const res = await deleteComment(movieId, commentId, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async getGifts(params: GetGiftsParams) {
    const res = await getGifts(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async getSupportingStatus(userId: string) {
    const res = await getSupportingStatus(
      userId,
      { target_user_id: userId },
      this._axiosInstance
    );
    return this._toReturnFormat(res);
  }

  async supportUser(params: SupportUserParams) {
    const res = await supportUser(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async unsupportUser(params: UnsupportUserParams) {
    const res = await unsupportUser(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async getSupportingList(userId: string, params: GetSupportingListParams) {
    const res = await getSupportingList(userId, params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  async getSupporterList(userId: string, params: GetSupporterListParams) {
    const res = await getSupporterList(userId, params, this._axiosInstance);
    return this._toReturnFormat(res);
  }
}

// exports
export type * from "./user";
export type * from "./live-thumbnail";
export type * from "./movie";
export type * from "./comment";
export type * from "./gift";
export type * from "./supporter";
