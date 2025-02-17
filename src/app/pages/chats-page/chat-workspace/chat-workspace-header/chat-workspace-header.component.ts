import { Component, input } from '@angular/core';
import { IChat } from '../../../../data/interfaces/chats.interface';
import { Profile } from '../../../../data/interfaces/profile.interfaces';
import { AvatarCircleComponent } from "../../../../common-ui/avatar-circle/avatar-circle.component";

@Component({
  selector: 'app-chat-workspace-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss'
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>()
}
