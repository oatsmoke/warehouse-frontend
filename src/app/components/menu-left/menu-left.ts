import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MenuLeftData, MenuLeftType} from '../../services/menu-left';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-menu-left',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu-left.html',
  styleUrl: './menu-left.css'
})

export class MenuLeft implements OnChanges {
  @Input() url!: string
  @Input() param!: string
  @Input() id!: string
  items!: MenuLeftType[];
  localstorage = localStorage;

  constructor() {
    this.items = MenuLeftData
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.param || !this.id) return;

    if (changes['param']) {
      const storedValue = localStorage.getItem(this.param) ?? "0";
      if (!localStorage.getItem(this.param)) {
        localStorage.setItem(this.param, storedValue);
      }
    }

    if (changes['id']) {
      localStorage.setItem(this.param, this.id);

    }
  }
}
