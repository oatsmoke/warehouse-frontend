import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfiles } from './list-profiles';

describe('ListProfiles', () => {
  let component: ListProfiles;
  let fixture: ComponentFixture<ListProfiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProfiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProfiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
