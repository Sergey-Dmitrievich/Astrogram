import { Observable } from "rxjs"
import { IChatWSMessage } from "./chat-ws-message.interface"

export interface IChatConnectionWSParams {
  url: string
  token: string
  handleMessage: (message: IChatWSMessage) => void
}



export interface IChatWsService {
  connect: (params: IChatConnectionWSParams) => void | Observable<IChatWSMessage>
  sendMessage: (text: string, chatId: number) => void
  disconnect: () => void
}
