import { TestBed } from '@angular/core/testing';

import { PutPasswordService } from './put-password.service';

describe('PutPasswordService', () => {
  let service: PutPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
