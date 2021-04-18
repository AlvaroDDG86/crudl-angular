import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  searchForm: FormGroup = this.fb.group({
    name: ['']
  })

  constructor(private router: Router,
            private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm.patchValue({
      name: sessionStorage.getItem('filterName') ? sessionStorage.getItem('filterName') : ''
    })
  }

  addHero() {
    this.router.navigate(['/edit', 'new'])
  }
}
