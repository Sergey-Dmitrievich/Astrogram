import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { IChat, ILastMessangeRes, IMessage } from "../interfaces/chats.interface";
import { ProfileService } from "./profile.service";
import { map, Observable } from "rxjs";
import { IChatWsService } from "../interfaces/chat-ws-service.interface";
import { ChatWsNativeService } from "./chat-ws-native.service";
import { AuthService } from "../../auth/auth.service";
import { IChatWSMessage } from "../interfaces/chat-ws-message.interface";
import { isNewMessage, isUnreadMessage } from "../interfaces/type-guards";
import { ChatWSRxjsService } from "./chat-ws-rxjs.service";

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient)
  #authService = inject(AuthService)
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`
  messageUrl = `${this.baseApiUrl}message/`
  me = inject(ProfileService).me

  connectWs() {
    return this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage
    }) as Observable<IChatWSMessage>
  }



  handleWSMessage = (message: IChatWSMessage) => {
    if(!('action' in message)) return

    if(isUnreadMessage(message)){
      //message.data.
    }
    if(isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false
        }
      ])
    }
  }

  wsAdapter: IChatWsService = new ChatWSRxjsService()

  activeChatMessages = signal<IMessage[]>([])

  createChat(userId: number) {
    return this.http.post<IChat>(`${this.chatsUrl}${userId}`, {})
  }

  getMyChats() {
    return this.http.get<ILastMessangeRes[]>(`${this.chatsUrl}get_my_chats/`)
  }

  getChatById(chatId: number) {
    return this.http.get<IChat>(`${this.chatsUrl}${chatId}`)
    .pipe(map(chat => {
      const patchedMessages = chat.messages.map(message => {
        return {
          ...message,
          user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
          isMine: message.userFromId === this.me()!.id
        }
      })
      this.activeChatMessages.set(patchedMessages)
      return{
        ...chat,
        companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst,
        messages: patchedMessages
      }
    }))
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<IMessage>(`${this.messageUrl}send/${chatId}`, {},{
      params: {
        message
      }
    })
  }
}
