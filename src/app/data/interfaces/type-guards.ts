import { IChatWSMessage, IChatWSNewMessage, IChatWSUnreadMessage } from "./chat-ws-message.interface";

export function isUnreadMessage(message: IChatWSMessage): message is IChatWSUnreadMessage{
  return 'action' in message && message.action === 'unread'
}
export function isNewMessage(message: IChatWSMessage): message is IChatWSNewMessage{
  return 'action' in message && message.action === 'message'
}


