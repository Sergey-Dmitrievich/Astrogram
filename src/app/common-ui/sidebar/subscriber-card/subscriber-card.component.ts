import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interfaces';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImgUrlPipe, CommonModule],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
  ProfileService: any;
}
