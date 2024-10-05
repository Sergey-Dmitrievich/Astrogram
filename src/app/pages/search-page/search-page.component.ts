import { Component, inject } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interfaces';
import { ProfileService } from '../../data/services/profile.service';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectFilteredProfiles } from '../../data';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent, CommonModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  title = 'Astrogram';
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  constructor() {}
}
