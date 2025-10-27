import {Component, Input, OnChanges, signal, SimpleChanges} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MenuDepartmentData, MenuDepartmentType} from '../../services/menu-department';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-menu-department',
  imports: [
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './menu-department.html',
  styleUrl: './menu-department.css'
})

export class MenuDepartment implements OnChanges {
  @Input() url!: string
  @Input() param!: string
  @Input() id!: string
  items: MenuDepartmentType[]
  protected readonly department = signal("")
  protected readonly String = String;

  constructor(private router: Router) {
    this.items = MenuDepartmentData
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      if (this.id == "0") {
        this.department.set("Склад")
      } else {
        const item = this.items.find(item => String(item.id) == this.id)
        if (item) {
          this.department.set(item.title)
        } else {
          this.router.navigate(['/equipment/department/0']).then()
        }
      }
    }
  }
}
