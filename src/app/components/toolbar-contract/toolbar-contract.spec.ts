import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarContract } from './toolbar-contract';

describe('ToolbarContract', () => {
  let component: ToolbarContract;
  let fixture: ComponentFixture<ToolbarContract>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarContract]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarContract);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
