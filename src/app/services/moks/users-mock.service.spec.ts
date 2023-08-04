import { TestBed } from '@angular/core/testing';

import { UsersMockService } from './users-mock.service';

describe('UsersMockService', () => {
  let service: UsersMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
