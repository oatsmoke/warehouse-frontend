import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDepartment } from './menu-department';

describe('MenuDepartment', () => {
  let component: MenuDepartment;
  let fixture: ComponentFixture<MenuDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDepartment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
