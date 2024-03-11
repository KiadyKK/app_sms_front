import { TestBed } from '@angular/core/testing';

import { RdzService } from './rdz.service';

describe('RdzService', () => {
  let service: RdzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RdzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
