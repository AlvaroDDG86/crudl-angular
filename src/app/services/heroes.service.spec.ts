import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { HttpClientModule } from '@angular/common/http';
import { Hero } from '../models/Hero.model';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';


describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;
  const dummyHeroes: Hero[] = [
    {
      "id": 1,
      "name": "Batman"
    },
    {
      "id": 2,
      "name": "Superman"
    }
  ]


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load all heroes', () => {
    service.getHeroes().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res).toEqual(dummyHeroes);
    })

    const request = httpMock.expectOne( `${service.BASE_URL}/heroes`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyHeroes);
  });

  it('should load all heroes filtered by name', () => {
    const filterText = 'Super'
    service.getHeroes(filterText).subscribe(res => {
      expect(res.length).toBe(1);
    })

    const request = httpMock.expectOne( `${service.BASE_URL}/heroes?name_like=${filterText}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyHeroes.filter(hero => hero.name.indexOf(filterText) > -1));
  });

  it('should get a Hero by id', () => {
    const heroId: string = '1';
    service.getHeroById(heroId).subscribe(res => {
      expect(res.id).toBe(parseInt(heroId));
    })

    const request = httpMock.expectOne( `${service.BASE_URL}/heroes?id=${heroId}`);
    expect(request.request.method).toBe('GET');
    request.flush([{ id: 1, name: 'any' }]);
  });

  it('should edit a Hero', () => {
    const heroEdited: Hero = {
      id: 2,
      name: 'any'
    }
    service.updateHero(heroEdited).subscribe(res => {
      expect(res).toBe(heroEdited);
    })

    const request = httpMock.expectOne( `${service.BASE_URL}/heroes/${heroEdited.id}`);
    expect(request.request.method).toBe('PATCH');
    request.flush(heroEdited);
  });

  it('should delete a Hero', () => {
    const deleteId: number = 1;
    service.deleteHero(deleteId).subscribe((res: number) => {
      expect(res).toBe(deleteId);
    })

    const request = httpMock.expectOne( `${service.BASE_URL}/heroes/${deleteId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(deleteId);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
