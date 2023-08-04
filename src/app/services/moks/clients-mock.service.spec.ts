import { TestBed } from '@angular/core/testing';

import { ClientsMockService } from './clients-mock.service';

describe('ClientsMockService', () => {
  let service: ClientsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
