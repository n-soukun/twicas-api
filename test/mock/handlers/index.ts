import { userHandlers } from "./user";
import { movieHandlers } from "./movie";
import { commentHandlers } from "./comment";
import { giftHandlers } from "./gift";
import { supporterHandlers } from "./supporter";
import { categoryHandlers } from "./category";
import { searchHandlers } from "./search";
import { webhookHandlers } from "./webhook";
import { broadcastingHandlers } from "./broadcasting";

export const handlers = [
  ...userHandlers,
  ...movieHandlers,
  ...commentHandlers,
  ...giftHandlers,
  ...supporterHandlers,
  ...categoryHandlers,
  ...searchHandlers,
  ...webhookHandlers,
  ...broadcastingHandlers,
];
