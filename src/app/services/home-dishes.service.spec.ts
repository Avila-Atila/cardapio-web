import { TestBed } from '@angular/core/testing';

import { HomeDishesService } from './home-dishes.service';

describe('HomeDishesService', () => {
  let service: HomeDishesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeDishesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
