import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarControl } from './toolbar-control';

describe('ToolbarControl', () => {
  let component: ToolbarControl;
  let fixture: ComponentFixture<ToolbarControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
