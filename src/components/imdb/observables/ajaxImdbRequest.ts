import { ajax } from 'rxjs/ajax'
import { retry, catchError } from 'rxjs/operators'

import { API_IMDB } from '../const/urls'

export default (query:string) => {
  return ajax({
    url: `${API_IMDB}?page=1&r=json&s="${query}"`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).pipe(
    retry(2),
    catchError(error => {
      throw `Error in imdb reqest: ${error}`
    })
  )
}