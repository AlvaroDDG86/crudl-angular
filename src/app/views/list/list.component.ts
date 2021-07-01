import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { SnackbarService } from '../../services/snackbar.service';
import { AppTableComponent } from '../../components/app-table/app-table.component';
import { Hero } from 'src/app/models/Hero.model';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  searchForm: FormGroup = this.fb.group({
    name: ['']
  })
  @ViewChild(AppTableComponent) appTableRef?: AppTableComponent;

  constructor(private router: Router,
              private fb: FormBuilder,
              private heroesService: HeroesService,
              private snackbarService: SnackbarService) {
            }

  ngOnInit(): void {
    this.searchForm.patchValue({
      name: sessionStorage.getItem('filterName') ? sessionStorage.getItem('filterName') : ''
    })
  }

  addHero() {
    this.router.navigate(['/edit', 'new'])
  }

  deleteRow(event: Hero) {
    this.heroesService.deleteFirebaseHero(event.id).then(() => {
      this.snackbarService.openSnackBar(`Hero has been deleted`, 'Acept', 'info', 4000)
      if (this.appTableRef) {
        this.appTableRef.refreshTable();
      }
    })
  }

  editRow(event: Hero) {
    this.router.navigate(['/edit', event.id]);
  }
}
