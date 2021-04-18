import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Hero } from '../models/Hero';
import { mergeAll, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

const BASE_URL = '/api'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) {}

  /**
   * Return a list of all heroes
   */
  getHeroes(filter?: string): Observable<Hero[]> {
    const url = `${BASE_URL}/heroes${filter ? '?name_like=' + filter + '&' : '?'}${'_page=1&_limit=5'}`
    return this.http.get<Hero[]>(url)
  }

  /**
   *
   * @param id id to get the Hero
   * Get Hero by id
   */
  getHeroById(id: String | null): Observable<Hero> {
    const url = `${BASE_URL}/heroes?id=${id}`
    return this.http.get<Hero[]>(url)
      .pipe(
        switchMap((res: Hero[]) => {
          if (res.length > 0) {
            return of(res[0])
          } else {
            return of({
              id: 0,
              name: ''
            })
          }
        })
      )
  }

  /**
   *
   * @param hero Hero to add
   * Add Hero to  DB
   */
  addHero(hero: Hero): Observable<Hero> {
    return this.getHeroes().pipe(
      switchMap((res: Hero[]) => {
        let id = res.length > 0 ? (Math.max(...res.map(hero => hero.id)) + 1) : 1;
        const url = `${BASE_URL}/heroes`
        return this.http.post<Hero>(url, { ...hero, id })
     })
    )
  }

  /**
   *
   * @param hero Hero to update
   * Update a Hero
   */
  updateHero(hero: Hero): Observable<Hero> {
    const url = `${BASE_URL}/heroes/${hero.id}`
    return this.http.patch<Hero>(url, hero)
  }

  /**
   *
   * @param id id to delete by
   * Delete a Hero by id
   */
  deleteHero(id: number): any {
    const url = `${BASE_URL}/heroes/${id}`
    return this.http.delete<any>(url)
  }

}
