import { Route } from "@angular/router";
import { ChatsPageComponent } from "./chats.component";
import { ChatWorkspaceComponent } from "./chat-workspace/chat-workspace.component";

export const chatsRouter: Route[] = [
  {
    path: '',
    component: ChatsPageComponent,
    children: [
      {path: ':id', component: ChatWorkspaceComponent},
    ]
  }
]