import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEquipmentCreate } from './form-equipment-create';

describe('FormEquipmentCreate', () => {
  let component: FormEquipmentCreate;
  let fixture: ComponentFixture<FormEquipmentCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEquipmentCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEquipmentCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
