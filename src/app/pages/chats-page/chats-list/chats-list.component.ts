import { Component, inject } from '@angular/core';
import { ChatsBtnComponent } from "../chats-btn/chats-btn.component";
import { ChatsService } from '../../../data/services/chats.service';
import { AsyncPipe } from '@angular/common';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { FormControl } from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [ChatsBtnComponent, 
    AsyncPipe, 
    RouterLink, 
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
  chatsService = inject(ChatsService)

  filterChatsControl = new FormControl('')

  chats$ = this.chatsService.getMyChats()
  .pipe(
    switchMap(chats => {
      return this.filterChatsControl.valueChanges
      .pipe(
        startWith(''),
        map( inputValue => {
          return chats.filter(chat => {
            return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`.toLowerCase().includes(inputValue?.toLowerCase() ?? '')
          })
        })
      )
    })
  )


}
