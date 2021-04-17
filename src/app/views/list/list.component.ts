import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/Hero';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  heroes$?: Observable<Hero[]> | null;

  constructor(private heroService: HeroesService) { }

  ngOnInit(): void {
    this.heroes$ = this.heroService.getHeroes();
  }
}
