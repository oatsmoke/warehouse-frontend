import {Component, Input, signal} from '@angular/core';
import {MenuControl} from '../menu-control/menu-control';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MenuControlService} from '../../services/menu-control';

@Component({
  selector: 'app-toolbar-control',
  imports: [
    MenuControl,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './toolbar-control.html',
  styleUrl: './toolbar-control.css'
})

export class ToolbarControl {
  @Input() url!: string
  @Input() param!: string
  @Input() id!: string

  add = signal(false)

  constructor(private menuControlService: MenuControlService) {
    this.add = this.menuControlService.add
  }

  addCard() {
    this.menuControlService.toggleAdd()
  }
}
