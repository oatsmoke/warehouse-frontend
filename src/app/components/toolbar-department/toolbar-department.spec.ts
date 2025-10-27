import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarDepartment } from './toolbar-department';

describe('ToolbarDepartment', () => {
  let component: ToolbarDepartment;
  let fixture: ComponentFixture<ToolbarDepartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarDepartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarDepartment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
