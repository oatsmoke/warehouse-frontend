import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOption } from './menu-option';

describe('MenuOption', () => {
  let component: MenuOption;
  let fixture: ComponentFixture<MenuOption>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuOption]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOption);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
