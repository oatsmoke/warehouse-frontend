import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEquipments } from './list-equipments';

describe('ListEquipments', () => {
  let component: ListEquipments;
  let fixture: ComponentFixture<ListEquipments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEquipments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEquipments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
