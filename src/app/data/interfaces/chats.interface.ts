import { Profile } from "./profile.interfaces"

export interface IChat {
  id: number
  userFirst:Profile
  userSecond: Profile
  messages: IMessage[]
  companion?: Profile
}

export interface IMessage{
  id: number
  userFromId: number
  personalChatId: number
  text: string
  createdAt: string
  isRead: boolean
  updatedAt: string
  user?: Profile
  isMine?: Boolean
}

export interface ILastMessangeRes {
  id: number
  userFrom: Profile
  message: string | null
}