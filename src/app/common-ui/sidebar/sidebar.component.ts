import { Component, inject, WritableSignal } from '@angular/core';
import { SvgComponent } from "../svg-icon/svg-icon.component";
import {RouterModule} from '@angular/router';
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile.interfaces';
import { firstValueFrom, Observable } from 'rxjs';
import { Pageble } from '../../data/interfaces/pageble.interface';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgComponent,
    SubscriberCardComponent,
    RouterModule,
    CommonModule,
    ImgUrlPipe,
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribersShortList()
  

  me = this.profileService.me

  abc() {
    console.log(this.subscribers$)
  }
  menuItems = [
    {
      label: 'Моя страница',
      icon: '/assets/svg/homeIcon.png',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: '/assets/svg/chatIcon.png',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: '/assets/svg/searchIcon.png',
      link: 'search'
    }
  ]

  ngOnInit(){
    firstValueFrom(this.profileService.getMe())
  }
}
