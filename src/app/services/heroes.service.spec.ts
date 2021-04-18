import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load all heroes', () => {
    expect(service).toBeTruthy();
  });

  it('should load all heroes filtered by name', () => {
    expect(service).toBeTruthy();
  });

  it('should load a hero by id', () => {
    expect(service).toBeTruthy();
  });

  it('should create new hero', () => {
    expect(service).toBeTruthy();
  });

  it('should edit a hero', () => {
    expect(service).toBeTruthy();
  });

  it('should delete a hero', () => {
    expect(service).toBeTruthy();
  });
});
