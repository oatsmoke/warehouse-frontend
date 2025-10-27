import { TestBed } from '@angular/core/testing';

import { MenuDepartmentService } from './menu-department';

describe('MenuDepartmentService', () => {
  let service: MenuDepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuDepartmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
