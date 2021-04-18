import { Injectable } from '@angular/core';
import { Publisher } from '../models/Publisher.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BASE_URL = '/api'

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) { }

  getPublishers(): Observable<Publisher[]> {
    const url = `${BASE_URL}/publishers`
    return this.http.get<Publisher[]>(url)
  }
}
