import { z } from "zod";

// https://apiv2-doc.twitcasting.tv/#user-object
export const userScheme = z.looseObject({
  id: z.string(),
  screen_id: z.string(),
  name: z.string(),
  image: z.string(),
  profile: z.string(),
  level: z.number(),
  last_movie_id: z.string().nullish(),
  is_live: z.boolean(),
});
export type User = z.infer<typeof userScheme>;

// https://apiv2-doc.twitcasting.tv/#movie-object
export const movieScheme = z.looseObject({
  id: z.string(),
  user_id: z.string(),
  title: z.string(),
  subtitle: z.string().nullish(),
  last_owner_comment: z.string().nullish(),
  category: z.string().nullish(),
  link: z.string(),
  is_live: z.boolean(),
  is_recorded: z.boolean(),
  comment_count: z.number(),
  large_thumbnail: z.string(),
  small_thumbnail: z.string(),
  country: z.string(),
  duration: z.number(),
  created: z.number(),
  is_collabo: z.boolean(),
  is_protected: z.boolean(),
  max_view_count: z.number(),
  current_view_count: z.number(),
  total_view_count: z.number(),
  hls_url: z.string().nullish(),
});
export type Movie = z.infer<typeof movieScheme>;

// https://apiv2-doc.twitcasting.tv/#comment-object
export const commentScheme = z.looseObject({
  id: z.string(),
  message: z.string(),
  from_user: userScheme,
  created: z.number(),
});
export type Comment = z.infer<typeof commentScheme>;

// https://apiv2-doc.twitcasting.tv/#gift-object
export const giftScheme = z.looseObject({
  id: z.string(),
  message: z.string(),
  item_image: z.string(),
  item_sub_image: z.string().nullish(),
  item_id: z.string(),
  item_mp: z.string(),
  item_name: z.string(),
  user_image: z.string(),
  user_screen_id: z.string(),
  user_screen_name: z.string(),
  user_name: z.string(),
});
export type Gift = z.infer<typeof giftScheme>;

// https://apiv2-doc.twitcasting.tv/#supporteruser-object
export const supporterUserScheme = userScheme.extend({
  supported: z.number(),
  point: z.number(),
  total_point: z.number(),
});
export type SupporterUser = z.infer<typeof supporterUserScheme>;
