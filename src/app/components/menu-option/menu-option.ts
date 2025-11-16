import {Component, Input} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from '@angular/material/icon';

export interface MenuOptionType {
  title: string
  title_deleted: string
  action: (id: number, deleted: string) => void
}

@Component({
  selector: 'app-menu-option',
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './menu-option.html',
  styleUrl: './menu-option.css'
})

export class MenuOption {
  @Input() items: MenuOptionType[] = []
  @Input() id!: number
  @Input() deleted!: string
}
