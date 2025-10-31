import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfirm } from './form-confirm';

describe('FormConfirm', () => {
  let component: FormConfirm;
  let fixture: ComponentFixture<FormConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormConfirm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConfirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
