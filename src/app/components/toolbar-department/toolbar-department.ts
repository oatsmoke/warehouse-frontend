import {Component, Input} from '@angular/core';
import {MenuDepartment} from '../menu-department/menu-department';

@Component({
  selector: 'app-toolbar-department',
  imports: [
    MenuDepartment
  ],
  templateUrl: './toolbar-department.html',
  styleUrl: './toolbar-department.css'
})

export class ToolbarDepartment {
  @Input() url!: string
  @Input() param!: string
  @Input() id!: string
}
