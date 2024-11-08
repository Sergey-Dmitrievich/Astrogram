import { IDadataSuggestions } from './../interfaces/dadata';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DADATA_TOKEN } from './token';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadataService {
  // #apiUrl = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party'
  #apiUrl = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
  #http = inject(HttpClient)

  getSuggestion(query: string){
    return this.#http.post<{suggestions: IDadataSuggestions[]}>(this.#apiUrl, {query}, {
      headers: {
         Authorization: `token ${DADATA_TOKEN}`
      }
    }).pipe(
      map(res => {
        return res.suggestions
        // return Array.from(
        //   new Set(
        //     res.suggestions.map(
        //       (suggestion: IDadataSuggestions) => {
        //       return suggestion.data.city
        //     })))
      })
    )
  }
}
