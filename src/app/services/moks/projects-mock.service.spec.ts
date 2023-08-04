import { TestBed } from '@angular/core/testing';

import { ProjectsMockService } from './projects-mock.service';

describe('ProjectsMockService', () => {
  let service: ProjectsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
