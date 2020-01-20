import {
  map,
  mergeMap,
  filter,
  distinctUntilChanged,
} from 'rxjs/operators'
import { fromEvent } from 'rxjs'

import ajaxImdbRequest$ from './observables/ajaxImdbRequest'

const getInputValue = (selector:string):string => {
  return (document.querySelector("input#imdb-sarch") as HTMLInputElement).value
}

const imdbForm = document.querySelector('#imdb-form')
const imdbFormSubmit$ = fromEvent(imdbForm, 'submit').pipe(
  map(() => {
    event.preventDefault()
    return getInputValue("input#imdb-sarch")
  }),
  filter(x => !!x),
  filter(x => x.length >= 3),
  distinctUntilChanged(),
  mergeMap(ajaxImdbRequest$),
  map(data => JSON.stringify(data.response.Search)),
)

const imdbSearchResults = imdbFormSubmit$.subscribe({
  next: (x: string) => {
    document.querySelector("#imdb-results").innerHTML = x;
  },
  error: error => console.log(error)
})

// .DS_Store
// node_modules/
