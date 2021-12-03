import { TestBed } from '@angular/core/testing';

import { TotalTimeService } from './total-time.service';

describe('TotalTimeService', () => {
  let service: TotalTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
