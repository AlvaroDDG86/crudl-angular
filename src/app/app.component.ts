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
  constructor(private heroService: HeroesService) {
    // this.heroService.getHeroes().subscribe(res => console.log(res));
    // this.heroService.getHeroesByName('an').subscribe(res => console.log(res));
    // this.heroService.getHeroeById(11).subscribe(res => console.log(res));
    // this.heroService.updateHero({ id: 3, name: 'Cagón' }).subscribe(res => console.log(res));
    // this.heroService.addHero({ id: 3, name: 'Rober' }).subscribe(res => console.log(res));
    // this.heroService.deleteHero(2).subscribe(res => console.log(res));
  }
}
