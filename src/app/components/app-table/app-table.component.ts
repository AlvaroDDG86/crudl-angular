import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AppTableDataSource } from './app-table-datasource';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/Hero';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';
import { SnackbarService } from '../../services/snackbar.service';
import { PublisherService } from '../../services/publisher.service';
import { Publisher } from '../../models/Publisher';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss']
})
export class AppTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Hero>;
  _searchInput: string = ''
  @Input() set searchInput(value: string) {
    this._searchInput = value;
    // Actualizar lista
    this.dataSource.filterData(value);
  }

  dataSource: AppTableDataSource;
  displayedColumns = ['actions', 'name', 'alterHego', 'publisher', 'placeOfBirth'];
  publishers: Publisher[] = [];

  constructor(private heroesService: HeroesService,
    private publisherServices: PublisherService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    private router: Router) {
    this.dataSource = new AppTableDataSource(this.heroesService);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.publisherServices.getPublishers().subscribe((res: Publisher[]) => this.publishers = res)
  }

  openDeleteRow(row: Hero) {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      data: {
        title: 'Delete',
        message: `Are you to delete the Hero ${row.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.deleteHero(row.id).subscribe(() => {
          this.snackbarService.openSnackBar(`Hero has been deleted`, 'Acept', 'info', 4000)
          this.dataSource.filterData(this._searchInput);
        })
      }
    });
  }

  editRow(row: Hero) {
    sessionStorage.setItem('filterName', this._searchInput)
    this.router.navigate(['/edit', row.id]);
  }

  getPublisherName(row: Hero) {
    const publisher = this.publishers.find(pb => pb.id === row.publisher)
    return publisher ? publisher.name : ''
  }
}
