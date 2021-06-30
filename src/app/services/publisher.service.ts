import { Injectable } from '@angular/core';
import { Publisher } from '../models/Publisher.model';
import { from, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FirebaseParserService } from './firebase-parser.service';

const BASE_URL = '/api'

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient,
    private firestore: AngularFirestore,
    private fbparser: FirebaseParserService) { }

  getPublishers(): Observable<Publisher[]> {
    const url = `${BASE_URL}/publishers`
    return this.http.get<Publisher[]>(url)
  }

  getFirebasePublishers(): Observable<any[]> {
    return this.firestore.collection('publishers').valueChanges().pipe(
      map((res: any) => this.fbparser.parseObjectAddingId(res))
    )
  }
}
