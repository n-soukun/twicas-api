import axios, { AxiosError, AxiosResponse } from "axios";

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
  GetMoviesByUserParams,
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
import { getCategories, GetCategoriesParams } from "./category";
import {
  searchUsers,
  searchLiveMovies,
  SearchUsersParams,
  SearchLiveMoviesParams,
} from "./search";
import {
  getWebHookList,
  GetWebHookListParams,
  registerWebHook,
  RegisterWebHookParams,
  removeWebHook,
  RemoveWebHookParams,
} from "./webHook";
import { getRTMPUrl } from "./broadcasting";

import { TwiCasAPIError } from "./errors";
import { toBase64 } from "../utils";

export interface TwiCasAPIRateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * TwiCasClientのオプション
 *
 * - `accessToken` を指定した場合、ユーザ単位での認証となります。
 * - `clientId` と `clientSecret` を指定した場合、アプリケーション単位での認証となります。
 */
export type TwiCasClientOptions = {
  /**
   * gzip を指定可能です。レスポンスのサイズが一定以上の場合のみ圧縮を行います。
   */
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

    this._axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          return Promise.reject(new TwiCasAPIError(error.response));
        }
        return Promise.reject(error);
      }
    );
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

  /**
   * ユーザ情報を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-user-info
   * @param userId ユーザの`id`または`screen_id`
   */
  async getUserInfo(userId: string) {
    const res = await getUserInfo(userId, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * アクセストークンを検証し、ユーザ情報を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#verify-credentials
   */
  async verifyCredentials() {
    const res = await verifyCredentials(this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * 配信中のライブのサムネイル画像のURLを作成する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-live-thumbnail-image
   * @param userId ユーザの`id`または`screen_id`
   */
  createLiveThumbnailUrl(userId: string): string {
    return createLiveThumbnailUrl(userId, this._axiosInstance);
  }

  /**
   * 配信中のライブのサムネイル画像を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-live-thumbnail-image
   * @param userId ユーザの`id`または`screen_id`
   */
  async getLiveThumbnailImage(userId: string) {
    const res = await getLiveThumbnailImage(userId, this._axiosInstance);

    // このエンドポイントはレートリミットなし
    return {
      data: res.data,
      rowResponse: res,
    };
  }

  /**
   * ライブ（録画）情報を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-movie-info
   */
  async getMovieInfo(movieId: string) {
    const res = await getMovieInfo(movieId, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * ユーザーが保有する過去ライブ（録画）の一覧を作成日時の降順で取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-movies-by-user
   * @param userId ユーザの`id`または`screen_id`
   */
  async getMoviesByUser(userId: string, params: GetMoviesByUserParams = {}) {
    const res = await getMoviesByUser(userId, params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * ユーザーが配信中の場合、ライブ情報を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-current-live
   * @param userId ユーザの`id`または`screen_id`
   */
  async getCurrentLive(userId: string) {
    const res = await getCurrentLive(userId, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * ユーザーが配信中の場合、ライブのテロップを設定する。
   *
   * https://apiv2-doc.twitcasting.tv/#set-current-live-subtitle
   */
  async setCurrentLiveSubtitle(params: SetCurrentLiveSubtitleParams) {
    const res = await setCurrentLiveSubtitle(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * ユーザーが配信中の場合、ライブのテロップを解除する。
   *
   * https://apiv2-doc.twitcasting.tv/#unset-current-live-subtitle
   */
  async unsetCurrentLiveSubtitle() {
    const res = await unsetCurrentLiveSubtitle(this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * ユーザーが配信中の場合、ライブのハッシュタグを設定する。
   *
   * https://apiv2-doc.twitcasting.tv/#set-current-live-hashtag
   */
  async setCurrentLiveHashtag(params: SetCurrentLiveHashtagParams) {
    const res = await setCurrentLiveHashtag(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * ユーザーが配信中の場合、ライブのハッシュタグを解除する。
   *
   * https://apiv2-doc.twitcasting.tv/#unset-current-live-hashtag
   */
  async unsetCurrentLiveHashtag() {
    const res = await unsetCurrentLiveHashtag(this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * コメントを作成日時の降順で取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-comments
   */
  async getComments(movieId: string, params: GetCommentsParams = {}) {
    const res = await getComments(movieId, params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * コメントを投稿する。 ユーザ単位でのみ実行可能です。
   *
   * https://apiv2-doc.twitcasting.tv/#post-comment
   */
  async postComment(movieId: string, params: PostCommentParams) {
    const res = await postComment(movieId, params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * コメントを削除する。
   *
   * ユーザ単位でのみ実行可能です。
   * なお、原則として削除できるコメントは、投稿者がアクセストークンに紐づくユーザと同一のものに限られます。
   * ただし、Movieのオーナーであるユーザーのアクセストークンを用いる場合は他ユーザが投稿したコメントを削除することが出来ます。
   *
   * https://apiv2-doc.twitcasting.tv/#delete-comment
   */
  async deleteComment(movieId: string, commentId: string) {
    const res = await deleteComment(movieId, commentId, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * アクセストークンに紐づくユーザに直近10秒程度の間に送信されたアイテムを取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-gifts
   */
  async getGifts(params: GetGiftsParams = {}) {
    const res = await getGifts(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * ユーザーが、ある別のユーザのサポーターであるかの状態を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-supporting-status
   */
  async getSupportingStatus(userId: string) {
    const res = await getSupportingStatus(
      userId,
      { target_user_id: userId },
      this._axiosInstance
    );
    return this._toReturnFormat(res);
  }

  /**
   * 指定したユーザーのサポーターになる
   *
   * https://apiv2-doc.twitcasting.tv/#support-user
   */
  async supportUser(params: SupportUserParams) {
    const res = await supportUser(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * 指定したユーザーのサポーター状態を解除する
   *
   * https://apiv2-doc.twitcasting.tv/#unsupport-user
   */
  async unsupportUser(params: UnsupportUserParams) {
    const res = await unsupportUser(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * 指定したユーザーがサポートしているユーザーの一覧を取得する
   *
   * https://apiv2-doc.twitcasting.tv/#supporting-list
   * @param userId ユーザの`id`または`screen_id`
   */
  async getSupportingList(
    userId: string,
    params: GetSupportingListParams = {}
  ) {
    const res = await getSupportingList(userId, params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * 指定したユーザーをサポートしているユーザーの一覧を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#supporter-list
   * @param userId ユーザの`id`または`screen_id`
   */
  async getSupporterList(userId: string, params: GetSupporterListParams) {
    const res = await getSupporterList(userId, params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * 配信中のライブがあるカテゴリのみを取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-categories
   */
  async getCategories(params: GetCategoriesParams) {
    const res = await getCategories(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * ユーザを検索する。
   *
   * https://apiv2-doc.twitcasting.tv/#search-users
   */
  async searchUsers(params: SearchUsersParams) {
    const res = await searchUsers(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * 配信中のライブを検索する。
   *
   * https://apiv2-doc.twitcasting.tv/#search-live-movies
   */
  async searchLiveMovies(params: SearchLiveMoviesParams) {
    const res = await searchLiveMovies(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * アプリケーションに紐づく WebHook の一覧を取得する。
   *
   * アプリケーション単位でのみ実行可能です。
   *
   * https://apiv2-doc.twitcasting.tv/#get-webhook-list
   */
  async getWebHookList(params: GetWebHookListParams = {}) {
    const res = await getWebHookList(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * WebHookを新規登録します。
   *
   * このAPIを使用するためには、アプリケーションに WebHook URL が登録されている必要があります。
   *
   * https://apiv2-doc.twitcasting.tv/#register-webhook
   */
  async registerWebHook(params: RegisterWebHookParams) {
    const res = await registerWebHook(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * WebHookを削除する。
   *
   * https://apiv2-doc.twitcasting.tv/#remove-webhook
   */
  async removeWebHook(params: RemoveWebHookParams) {
    const res = await removeWebHook(params, this._axiosInstance);
    return this._toReturnFormat(res);
  }

  /**
   * アクセストークンに紐づくユーザの配信用のURL(RTMP)を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-rtmp-url
   */
  async getRTMPUrl() {
    const res = await getRTMPUrl(this._axiosInstance);
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
export type * from "./category";
export type * from "./search";
export type * from "./webHook";
export type * from "./broadcasting";
export { TwiCasAPIError } from "./errors";
