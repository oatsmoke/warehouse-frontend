import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuControl } from './menu-control';

describe('MenuControl', () => {
  let component: MenuControl;
  let fixture: ComponentFixture<MenuControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
