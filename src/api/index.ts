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

import { toBase64 } from "../utils";

export interface TwiCasAPIRateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

export interface TwiCasAPIFetchOptions {
  headers: Headers;
  baseUrl: string;
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
  private _fetchOptions: TwiCasAPIFetchOptions;

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

    const headers = new Headers();
    headers.append("X-Api-Version", "2.0");
    headers.append("Authorization", authorization);

    if (options.encoding === "gzip") {
      headers.append("Accept-Encoding", "gzip");
    }
    this._fetchOptions = {
      headers,
      baseUrl: this.baseUrl,
    };
  }

  /**
   * ユーザ情報を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-user-info
   * @param userId ユーザの`id`または`screen_id`
   */
  async getUserInfo(userId: string) {
    return getUserInfo(userId, this._fetchOptions);
  }

  /**
   * アクセストークンを検証し、ユーザ情報を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#verify-credentials
   */
  async verifyCredentials() {
    return verifyCredentials(this._fetchOptions);
  }

  /**
   * 配信中のライブのサムネイル画像のURLを作成する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-live-thumbnail-image
   * @param userId ユーザの`id`または`screen_id`
   */
  createLiveThumbnailUrl(userId: string): string {
    return createLiveThumbnailUrl(userId, this._fetchOptions);
  }

  /**
   * 配信中のライブのサムネイル画像を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-live-thumbnail-image
   * @param userId ユーザの`id`または`screen_id`
   */
  async getLiveThumbnailImage(userId: string) {
    const res = await getLiveThumbnailImage(userId, this._fetchOptions);

    // このエンドポイントはレートリミットなし
    return {
      data: res.body,
      rowResponse: res,
    };
  }

  /**
   * ライブ（録画）情報を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-movie-info
   */
  async getMovieInfo(movieId: string) {
    return getMovieInfo(movieId, this._fetchOptions);
  }

  /**
   * ユーザーが保有する過去ライブ（録画）の一覧を作成日時の降順で取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-movies-by-user
   * @param userId ユーザの`id`または`screen_id`
   */
  async getMoviesByUser(userId: string, params: GetMoviesByUserParams = {}) {
    return getMoviesByUser(userId, params, this._fetchOptions);
  }

  /**
   * ユーザーが配信中の場合、ライブ情報を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-current-live
   * @param userId ユーザの`id`または`screen_id`
   */
  async getCurrentLive(userId: string) {
    return getCurrentLive(userId, this._fetchOptions);
  }

  /**
   * ユーザーが配信中の場合、ライブのテロップを設定する。
   *
   * https://apiv2-doc.twitcasting.tv/#set-current-live-subtitle
   */
  async setCurrentLiveSubtitle(params: SetCurrentLiveSubtitleParams) {
    return setCurrentLiveSubtitle(params, this._fetchOptions);
  }

  /**
   * ユーザーが配信中の場合、ライブのテロップを解除する。
   *
   * https://apiv2-doc.twitcasting.tv/#unset-current-live-subtitle
   */
  async unsetCurrentLiveSubtitle() {
    return unsetCurrentLiveSubtitle(this._fetchOptions);
  }

  /**
   * ユーザーが配信中の場合、ライブのハッシュタグを設定する。
   *
   * https://apiv2-doc.twitcasting.tv/#set-current-live-hashtag
   */
  async setCurrentLiveHashtag(params: SetCurrentLiveHashtagParams) {
    return setCurrentLiveHashtag(params, this._fetchOptions);
  }

  /**
   * ユーザーが配信中の場合、ライブのハッシュタグを解除する。
   *
   * https://apiv2-doc.twitcasting.tv/#unset-current-live-hashtag
   */
  async unsetCurrentLiveHashtag() {
    return unsetCurrentLiveHashtag(this._fetchOptions);
  }

  /**
   * コメントを作成日時の降順で取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-comments
   */
  async getComments(movieId: string, params: GetCommentsParams = {}) {
    return getComments(movieId, params, this._fetchOptions);
  }

  /**
   * コメントを投稿する。 ユーザ単位でのみ実行可能です。
   *
   * https://apiv2-doc.twitcasting.tv/#post-comment
   */
  async postComment(movieId: string, params: PostCommentParams) {
    return postComment(movieId, params, this._fetchOptions);
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
    return deleteComment(movieId, commentId, this._fetchOptions);
  }

  /**
   * アクセストークンに紐づくユーザに直近10秒程度の間に送信されたアイテムを取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-gifts
   */
  async getGifts(params: GetGiftsParams = {}) {
    return getGifts(params, this._fetchOptions);
  }

  /**
   * ユーザーが、ある別のユーザのサポーターであるかの状態を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-supporting-status
   */
  async getSupportingStatus(userId: string) {
    return getSupportingStatus(
      userId,
      { target_user_id: userId },
      this._fetchOptions
    );
  }

  /**
   * 指定したユーザーのサポーターになる
   *
   * https://apiv2-doc.twitcasting.tv/#support-user
   */
  async supportUser(params: SupportUserParams) {
    return supportUser(params, this._fetchOptions);
  }

  /**
   * 指定したユーザーのサポーター状態を解除する
   *
   * https://apiv2-doc.twitcasting.tv/#unsupport-user
   */
  async unsupportUser(params: UnsupportUserParams) {
    return unsupportUser(params, this._fetchOptions);
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
    return getSupportingList(userId, params, this._fetchOptions);
  }

  /**
   * 指定したユーザーをサポートしているユーザーの一覧を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#supporter-list
   * @param userId ユーザの`id`または`screen_id`
   */
  async getSupporterList(userId: string, params: GetSupporterListParams) {
    return getSupporterList(userId, params, this._fetchOptions);
  }

  /**
   * 配信中のライブがあるカテゴリのみを取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-categories
   */
  async getCategories(params: GetCategoriesParams) {
    return getCategories(params, this._fetchOptions);
  }

  /**
   * ユーザを検索する。
   *
   * https://apiv2-doc.twitcasting.tv/#search-users
   */
  async searchUsers(params: SearchUsersParams) {
    return searchUsers(params, this._fetchOptions);
  }

  /**
   * 配信中のライブを検索する。
   *
   * https://apiv2-doc.twitcasting.tv/#search-live-movies
   */
  async searchLiveMovies(params: SearchLiveMoviesParams) {
    return searchLiveMovies(params, this._fetchOptions);
  }

  /**
   * アプリケーションに紐づく WebHook の一覧を取得する。
   *
   * アプリケーション単位でのみ実行可能です。
   *
   * https://apiv2-doc.twitcasting.tv/#get-webhook-list
   */
  async getWebHookList(params: GetWebHookListParams = {}) {
    return getWebHookList(params, this._fetchOptions);
  }

  /**
   * WebHookを新規登録します。
   *
   * このAPIを使用するためには、アプリケーションに WebHook URL が登録されている必要があります。
   *
   * https://apiv2-doc.twitcasting.tv/#register-webhook
   */
  async registerWebHook(params: RegisterWebHookParams) {
    return registerWebHook(params, this._fetchOptions);
  }

  /**
   * WebHookを削除する。
   *
   * https://apiv2-doc.twitcasting.tv/#remove-webhook
   */
  async removeWebHook(params: RemoveWebHookParams) {
    return removeWebHook(params, this._fetchOptions);
  }

  /**
   * アクセストークンに紐づくユーザの配信用のURL(RTMP)を取得する。
   *
   * https://apiv2-doc.twitcasting.tv/#get-rtmp-url
   */
  async getRTMPUrl() {
    return getRTMPUrl(this._fetchOptions);
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
