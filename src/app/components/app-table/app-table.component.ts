import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AppTableDataSource } from './app-table-datasource';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/Hero';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss']
})
export class AppTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Hero>;
  @Input() set searchInput(value: string) {
    this.dataSource.loadHeroes(value).subscribe((res: any) => {
      // ¿?
    })
  }

  dataSource: AppTableDataSource;
  totalLength: number = 10;
  displayedColumns = ['id', 'name', 'actions'];

  constructor(private heroesService: HeroesService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) {
    this.dataSource = new AppTableDataSource(this.heroesService);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.loadHeroes().subscribe((res: any) => {
      // ¿?
    })
  }

  openDeleteRow(row: Hero) {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      data: {
        title: 'Delete',
        message: `Are you to delete the Hero ${row.name}?`
      }
    });

    // Solucionar esto
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.deleteHero(row.id).subscribe(() => {
          this._snackBar.open(`Hero was deleted`, 'Acept', {
            duration: 3000,
          });
          this.dataSource.loadHeroes().subscribe(() => {
            // ¿?
          })
        })
      }
    });
  }

  deleteRow(row: Hero) {

  }

  editRow(row: Hero) {
    this.router.navigate(['/edit', row.id]);
  }
}
