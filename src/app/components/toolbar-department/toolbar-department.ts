import {Component, Input} from '@angular/core';
import {MenuDepartment} from '../menu-department/menu-department';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ContentStateService, State} from '../../services/content-state';

@Component({
  selector: 'app-toolbar-department',
  imports: [
    MenuDepartment,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './toolbar-department.html',
  styleUrl: './toolbar-department.css'
})

export class ToolbarDepartment {
  @Input() url!: string
  @Input() param!: string
  @Input() id!: string

  constructor(private contentStateService: ContentStateService) {
  }

  create() {
    this.contentStateService.toggleContent(State.Create)
  }
}
