import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseParserService {
  constructor() {}

  parseObjectAddingId(res: any): any[] {
    const heroes: any[] = [];
    for (const key in res) {
      heroes.push({
        id: key,
        ...res[key],
      });
    }
    return heroes;
  }
}
