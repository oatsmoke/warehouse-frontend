import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCategory } from './form-category';

describe('FormCategory', () => {
  let component: FormCategory;
  let fixture: ComponentFixture<FormCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
