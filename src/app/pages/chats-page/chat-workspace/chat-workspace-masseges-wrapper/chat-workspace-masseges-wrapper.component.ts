import { Component, inject, input, signal } from '@angular/core';
import { ChatWorkspaceMassegesComponent } from "./chat-workspace-masseges/chat-workspace-masseges.component";
import { MessageInputComponent } from "../../../../common-ui/message-input/message-input.component";
import { ChatsService } from '../../../../data/services/chats.service';
import { Profile } from '../../../../data/interfaces/profile.interfaces';
import { IChat, IMessage } from '../../../../data/interfaces/chats.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat-workspace-masseges-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMassegesComponent, MessageInputComponent],
  templateUrl: './chat-workspace-masseges-wrapper.component.html',
  styleUrl: './chat-workspace-masseges-wrapper.component.scss'
})
export class ChatWorkspaceMassegesWrapperComponent {
  chatsService = inject(ChatsService)
  chat = input.required<IChat>()
  messages = this.chatsService.activeChatMessages

  async onSendMessage(messageText: string) {
    this.chatsService.wsAdapter.sendMessage(
      messageText,
      this.chat().id
    )

    //await firstValueFrom(this.chatsService.sendMessage(this.chat().id, messageText))

    await firstValueFrom(this.chatsService.getChatById(this.chat().id))


  }
}
