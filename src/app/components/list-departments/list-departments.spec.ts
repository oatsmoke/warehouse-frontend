import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDepartments } from './list-departments';

describe('ListDepartments', () => {
  let component: ListDepartments;
  let fixture: ComponentFixture<ListDepartments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDepartments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDepartments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
