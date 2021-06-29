import { IncomingMessage } from "http";

export interface IncomingMessageCustom extends IncomingMessage {
  user_uid?: string;
}
