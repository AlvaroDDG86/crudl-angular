import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openGithub() {
    window.open('https://github.com/AlvaroDDG86/crudl-angular', '_blanck')
  }

}
