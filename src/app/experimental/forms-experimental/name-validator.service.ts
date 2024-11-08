import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Profile } from '../../data/interfaces/profile.interfaces';

@Injectable({
  providedIn: 'root'
})
export class NameValidatorService implements AsyncValidator{

  http = inject(HttpClient)

  validate(control: AbstractControl): Observable<ValidationErrors | null>{
    return this.http.get<Profile[]>('https://icherniakov.ru/yt-course/account/test_accounts')
    .pipe(
      map(users => {
        return users.filter(u => u.firstName === control.value).length > 0
        ? null
        : {error: {message: `Имени нет в списке: ${users.map(u => u.firstName).join(', ')}`}}
      })
    )
  }

}
