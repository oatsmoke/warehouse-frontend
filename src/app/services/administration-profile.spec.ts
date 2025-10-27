import { TestBed } from '@angular/core/testing';

import { AdministrationProfileService } from './administration-profile';

describe('AdministrationProfileService', () => {
  let service: AdministrationProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
