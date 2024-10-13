import { Component, HostBinding, input } from '@angular/core';
import { IMessage } from '../../../../../data/interfaces/chats.interface';
import { AvatarCircleComponent } from "../../../../../common-ui/avatar-circle/avatar-circle.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace-masseges',
  standalone: true,
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-masseges.component.html',
  styleUrl: './chat-workspace-masseges.component.scss'
})
export class ChatWorkspaceMassegesComponent {
  message = input.required<IMessage>()

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine
  }
}
