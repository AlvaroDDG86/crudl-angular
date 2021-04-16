import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Hero } from '../models/Hero';
import { mergeAll } from 'rxjs/operators';
import { Observable } from 'rxjs';

const BASE_URL = '/api'

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) {}

  /**
   * Return a list of all heroes
   */
  getHeroes(): Observable<Hero[]> {
    const url = `${BASE_URL}/heroes`
    return this.http.get<Hero[]>(url)
  }

  /**
   *
   * @param name name to filter
   * Return a list of heroes filtered
   */
  getHeroesByName(name: string): Observable<Hero[]> {
    const url = `${BASE_URL}/heroes?name_like=${name}`
    return this.http.get<Hero[]>(url)
  }

  /**
   *
   * @param id id to get the Hero
   * Get Hero by id
   */
  getHeroeById(id: number): Observable<Hero> {
    const url = `${BASE_URL}/heroes?id=${id}`
    return this.http.get<Hero[]>(url).pipe(mergeAll())
  }

  /**
   *
   * @param hero Hero to add
   * Add Hero to  DB
   */
  addHero(hero: Hero): Observable<Hero> {
    const url = `${BASE_URL}/heroes`
    return this.http.post<Hero>(url, hero)
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
