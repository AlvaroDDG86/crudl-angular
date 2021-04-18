import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HeroesService } from './services/heroes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crudl-angular';
  constructor() {
  }
}
