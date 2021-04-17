import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AppTableDataSource } from './app-table-datasource';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/Hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss']
})
export class AppTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Hero>;
  dataSource: AppTableDataSource;
  totalLength: number = 10;
  displayedColumns = ['id', 'name', 'actions'];

  constructor(private heroesService: HeroesService,
    private router: Router) {
    this.dataSource = new AppTableDataSource(this.heroesService);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.loadHeroes().subscribe((res: any) => {
      console.log(res)
    })
  }

  deleteRow(row: any) {
    console.log(row)
  }

  editRow(row: any) {
    this.router.navigate(['/edit', row.id]);
  }
}
