import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmpty } from './form-empty';

describe('FormEmpty', () => {
  let component: FormEmpty;
  let fixture: ComponentFixture<FormEmpty>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEmpty]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEmpty);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
