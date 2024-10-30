import { webSocket, WebSocketSubject} from "rxjs/webSocket";
import { IChatConnectionWSParams, IChatWsService } from "../interfaces/chat-ws-service.interface";
import { IChatWSMessage } from "../interfaces/chat-ws-message.interface";
import { finalize, Observable, tap } from "rxjs";

export class ChatWSRxjsService implements IChatWsService {
  #socket: WebSocketSubject<IChatWSMessage> | null = null
  connect (params: IChatConnectionWSParams): Observable<IChatWSMessage> {
    if (!this.#socket) {
      this.#socket = webSocket({
      url: params.url,
      protocol: [params.token]
    })

    }

    return this.#socket.asObservable()
    .pipe(
      tap(message => params.handleMessage(message)),
      finalize(() => console.log('пока'))
    )
  }

  disconnect() {
    this.#socket?.complete()
  }
  sendMessage (text: string, chatId: number) {
    this.#socket?.next({
      text,
      chat_id: chatId
    })
  }

}
