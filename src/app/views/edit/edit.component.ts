import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../../models/Hero';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    name: ['', Validators.required]
  })

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private heroService: HeroesService,
              private _snackBar: MatSnackBar) {
            }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.heroService.getHeroById(params.get('id')))
    ).subscribe(res => {
      this.original = res;
      this.heroForm.patchValue({
        ...res
      })
    })
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
    this.heroService.updateHero(this.heroForm.value).subscribe(res => {
      if (res) {
        this.openSnackBar(`Hero ${res.name} saved`, 'Accept')
        this.router.navigate(['/list',]);
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
