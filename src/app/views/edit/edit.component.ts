import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { SnackbarService } from '../../services/snackbar.service';
import { PublisherService } from '../../services/publisher.service';
import { Publisher } from '../../models/Publisher.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: number = 0;
  original: any;
  heroForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    alterHego: [''],
    publisher: [''],
    placeOfBirth: ['']
  })
  publishers: Publisher[] = []

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private heroService: HeroesService,
              private publisherServices: PublisherService,
              private snackbarService: SnackbarService) {
            }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => params.get('id') !== 'new' ? this.heroService.getFirebaseHeroeById(params.get('id')) : of({ id: -1, name: 'Hero name' }))
    ).subscribe(
      res => {
        if(res.id === 0) {
          this.router.navigate(['/list'])
        }
        this.original = res;
        this.heroForm.patchValue({
          ...res
        })
      },
      err => console.log(err)
    )
    this.publisherServices.getFirebasePublishers().subscribe((res: Publisher[]) => this.publishers = res)
  }

  cancelEdit() {
    this.heroForm.patchValue({
      ...this.original
    })
  }

  submit() {
    if (!this.heroForm.valid) {
      return;
    }
    if (this.original.id !== -1) {
      this.heroService.editFirebaseHero(this.heroForm.value).then(res => {
        this.snackbarService.openSnackBar(`Hero saved`, 'Acept', 'success')
        this.router.navigate(['/list',]);
      }).catch(err => {
        this.snackbarService.openSnackBar('Error when editting a Hero', 'Acept', 'error')
      })
    } else {
      this.heroService.addFirebaseHero(this.heroForm.value).then(res => {
        this.snackbarService.openSnackBar(`New Hero created`, 'Acept', 'success')
        this.router.navigate(['/list',]);
      }).catch(err => {
        this.snackbarService.openSnackBar('Error when creating a Hero', 'Acept', 'error')
      })
    }
  }

  goBack() {
    this.router.navigate(['/list'])
  }
}
