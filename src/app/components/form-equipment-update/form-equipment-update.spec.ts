import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEquipmentUpdate } from './form-equipment-update';

describe('FormEquipmentUpdate', () => {
  let component: FormEquipmentUpdate;
  let fixture: ComponentFixture<FormEquipmentUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEquipmentUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEquipmentUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
