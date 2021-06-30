import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { Hero } from '../../models/Hero.model';
import { HeroesService } from '../../services/heroes.service';

export class AppTableDataSource extends DataSource<Hero> {
  paginator: MatPaginator | undefined;
  private searchName = new BehaviorSubject<string>(''); // Subscribe for input update

  constructor(private heroesService: HeroesService) {
    super();
  }

  connect(): Observable<Hero[]> {

    return this.searchName.pipe(
      switchMap(searchVale => {
        return this.heroesService.getFirebaseHeroes(searchVale)
          .pipe(
            switchMap(
              res => {
                if (this.paginator) {
                  return merge(observableOf(res), this.paginator.page) // Each time heroes or pagination change, this pipe is fired
                    .pipe(map(() => {
                      return this.getPagedData([...res ]);
                    }));
                } else {
                  throw Error('Error')
                }
              }
            )
          )
      })
    )
  }

  disconnect(): void {}

  private getPagedData(data: Hero[]): Hero[] {
    if (this.paginator) {
      this.paginator.length = data.length;
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  filterData(value: string) {
    this.searchName.next(value)
  }
}
