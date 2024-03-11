import { TestBed } from '@angular/core/testing';

import { DwhService } from './dwh.service';

describe('DwhService', () => {
  let service: DwhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DwhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
