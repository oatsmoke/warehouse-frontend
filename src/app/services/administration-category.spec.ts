import { TestBed } from '@angular/core/testing';

import { AdministrationCategoryService } from './administration-category';

describe('AdministrationCategoryService', () => {
  let service: AdministrationCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
