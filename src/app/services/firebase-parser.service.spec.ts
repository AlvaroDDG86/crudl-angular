import { TestBed } from '@angular/core/testing';

import { FirebaseParserService } from './firebase-parser.service';

describe('FirebaseParserService', () => {
  let service: FirebaseParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
