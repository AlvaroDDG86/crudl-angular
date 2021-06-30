import { AfterViewInit, Component, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { AppTableDataSource } from './app-table-datasource';
import { HeroesService } from '../../services/heroes.service';
import { PublisherService } from '../../services/publisher.service';
import { MatDialog } from '@angular/material/dialog';
import { Hero } from '../../models/Hero.model';
import { Publisher } from '../../models/Publisher.model';
import { EventEmitter } from '@angular/core';
import { AppDialogComponent } from '../app-dialog/app-dialog.component';

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
    this.dataSource.filterData(value);
  }
  @Input() displayedColumns: string[] = [];
  @Output() deleteEvent: EventEmitter<Hero> = new EventEmitter<Hero>();
  @Output() editEvent: EventEmitter<Hero> = new EventEmitter<Hero>();
  dataSource: AppTableDataSource;
  private _publishers: Publisher[] = [];

  constructor(private heroesService: HeroesService,
    private publisherServices: PublisherService,
    public dialog: MatDialog) {
    this.dataSource = new AppTableDataSource(this.heroesService);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.publisherServices.getFirebasePublishers().subscribe((res: Publisher[]) => this._publishers = res)
  }

  openDeleteRow(row: Hero) {
    const dialogRef = this.dialog.open(AppDialogComponent, {
      data: {
        title: 'Delete',
        message: `Are you to delete ${row.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => result && this.deleteEvent.emit(row));
  }

  editRow(row: Hero) {
    sessionStorage.setItem('filterName', this._searchInput)
    this.editEvent.emit(row)
  }

  getPublisherName(row: Hero) {
    const publisher = this._publishers.find(pb => pb.id === row.publisher)
    return publisher ? publisher.name : '--'
  }

  refreshTable() {
    this.dataSource.filterData(this._searchInput);
  }
}
