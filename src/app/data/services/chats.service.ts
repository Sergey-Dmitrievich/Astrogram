import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { IChat, ILastMessangeRes, IMessage } from "../interfaces/chats.interface";
import { ProfileService } from "./profile.service";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`
  messageUrl = `${this.baseApiUrl}message/`
  me = inject(ProfileService).me

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