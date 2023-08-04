import { TestBed } from '@angular/core/testing';

import { MonthsService } from './months.service';

describe('MonthsService', () => {
  let service: MonthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
