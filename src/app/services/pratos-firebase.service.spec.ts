import { TestBed } from '@angular/core/testing';

import { PratosFirebaseService } from './pratos-firebase.service';

describe('PratosFirebaseService', () => {
  let service: PratosFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PratosFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
