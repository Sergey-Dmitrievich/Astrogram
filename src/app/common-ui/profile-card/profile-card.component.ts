import { Component, inject, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interfaces';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { firstValueFrom } from 'rxjs';
import { ProfileService } from '../../data';
import { ActivatedRoute, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { ChatsService } from '../../data/services/chats.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  subscribers$ = this.profileService.getSubscribersShortList(5);
  me$ = toObservable(this.profileService.me);
  chatsService = inject(ChatsService)
  router = inject(Router)
  @Input() profile!: Profile;
  async sendMessage(userId: number) {
    firstValueFrom(this.chatsService.createChat(userId))
    .then((res) => {
      this.router.navigate(['/chats', res.id])
    })
  }
}
