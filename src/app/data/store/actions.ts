import { createActionGroup, props } from '@ngrx/store';
import { Profile } from '../interfaces/profile.interfaces';

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
  },
});
