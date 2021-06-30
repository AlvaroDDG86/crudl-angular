import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Hero } from '../models/Hero.model';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirebaseParserService } from './firebase-parser.service';
@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  BASE_URL = '/api'

  constructor(private http: HttpClient,
    private firestore: AngularFirestore,
    private fbparser: FirebaseParserService) {}

  /**
   * Return a list of all heroes
   */
  getHeroes(filter?: string): Observable<Hero[]> {
    const url = `${this.BASE_URL}/heroes${filter ? '?name_like=' + filter : ''}`
    return this.http.get<Hero[]>(url)
  }

  /**
   *
   * @param id id to get the Hero
   * Get Hero by id
   */
  getHeroById(id: String | null): Observable<Hero> {
    const url = `${this.BASE_URL}/heroes?id=${id}`
    return this.http.get<Hero[]>(url)
      .pipe(
        switchMap((res: Hero[]) => {
          if (res.length > 0) { // Hero find
            return of(res[0])
          } else {
            return of({ // No Hero find
              id: '0',
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
        // let id = res.length > 0 ? (Math.max(...res.map(hero => hero.id)) + 1) : 1; // Get new ID
        let id = 'Prueba'
        const url = `${this.BASE_URL}/heroes`
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
    const url = `${this.BASE_URL}/heroes/${hero.id}`
    return this.http.patch<Hero>(url, hero)
  }

  /**
   *
   * @param id id to delete by
   * Delete a Hero by id
   */
  deleteHero(id: number): any {
    const url = `${this.BASE_URL}/heroes/${id}`
    return this.http.delete<any>(url)
  }

  getFirebaseHeroes(filter?: string): Observable<any[]> {
    return this.firestore.collection<Hero>('heroes').snapshotChanges().pipe(
        map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Hero;
            data.id = a.payload.doc.id;
            return data
        });
      })
    );
  }

  getFirebaseHeroeById(id: String | null): Observable<any> {
    return this.firestore.collection<Hero>('heroes', ref => ref.where('__name__', '==', id )).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Hero;
            data.id = a.payload.doc.id;
            return data
        })
    })).pipe(
      switchMap((res: Hero[]) => {
        if (res.length > 0) { // Hero found
          return of(res[0])
        } else {
          return of({ // No Hero found
            id: 0,
            name: ''
          })
        }
      })
    )
  }

  deleteFirebaseHero(id: string): any {
    return this.firestore.collection('heroes').doc(id.toString()).delete()
  }
}
