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

  addFirebaseHero(hero: Hero) {
    let heroToSave: any = { ...hero }
    delete heroToSave.id
    return this.firestore.collection('heroes').add(heroToSave)
  }

  editFirebaseHero(hero: Hero) {
    let heroToSave: any = { ...hero }
    delete heroToSave.id
    return this.firestore.collection('heroes').doc(hero.id).update(
      {...heroToSave}
    )
  }
}
