import { userHandlers } from "./user";
import { movieHandlers } from "./movie";
import { commentHandlers } from "./comment";
import { giftHandlers } from "./gift";
import { supporterHandlers } from "./supporter";

export const handlers = [
  ...userHandlers,
  ...movieHandlers,
  ...commentHandlers,
  ...giftHandlers,
  ...supporterHandlers,
];
