import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { canActivateAuth } from './auth/access.guard';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { provideState } from '@ngrx/store';
import { profileFeature } from './data/store/reducer';
import { provideEffects } from '@ngrx/effects';
import { ProfileEffects } from './data/store/effects';
import { ChatsPageComponent } from './pages/chats-page/chats.component';
import { chatsRouter } from './pages/chats-page/chatsRouter';
import { FormsExperimentalComponent } from './experimental/forms-experimental/forms-experimental.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'experiments', component: FormsExperimentalComponent},
      
      { path: 'settings', component: SettingsPageComponent },
      { path: 'chats', 
        loadChildren: () => chatsRouter },
      { path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ],
      },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
