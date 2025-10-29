import {Component, Input, signal} from '@angular/core';
import {MenuControl} from '../menu-control/menu-control';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AdministrationCategoryService} from '../../services/administration-category';

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

  constructor(private administrationCategoryService: AdministrationCategoryService) {
    this.add = this.administrationCategoryService.add
  }

  addCard() {
    this.administrationCategoryService.toggleAdd()
  }
}
