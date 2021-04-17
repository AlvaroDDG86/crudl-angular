import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { Hero } from '../../models/Hero';
import { HeroesService } from '../../services/heroes.service';

export class AppTableDataSource extends DataSource<Hero> {
  private heroesSubject = new BehaviorSubject<Hero[]>([]);
  paginator: MatPaginator | undefined;

  constructor(private heroesService: HeroesService) {
    super();
  }

  connect(): Observable<Hero[]> {
    return this.heroesSubject.asObservable();
  }

  disconnect(): void {
    this.heroesSubject.complete();
  }

  loadHeroes(filter?: string) {
    if (filter) {
      return this.heroesService.getHeroesByName(filter).pipe(
        catchError(() => of([]))
      ).pipe(map(heroes => this.heroesSubject.next(heroes)));
    } else {
      return this.heroesService.getHeroes().pipe(
        catchError(() => of([]))
      ).pipe(map(heroes => this.heroesSubject.next(heroes)));
    }
  }
}
