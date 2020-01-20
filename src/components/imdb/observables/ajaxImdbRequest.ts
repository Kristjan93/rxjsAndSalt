import { ajax } from 'rxjs/ajax'
import { retry, catchError } from 'rxjs/operators'

import { API_IMDB } from '../const/urls'
import { config } from '../../../../config'

export default (query:string) => {
  return ajax({
    url: `${API_IMDB}?page=1&r=json&s="${query}"`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': config['x-rapidapi-host'],
      "x-rapidapi-key": config['x-rapidapi-key'],
    },
  }).pipe(
    retry(2),
    catchError(error => {
      throw `Error in imdb reqest: ${error}`
    })
  )
}