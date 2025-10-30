import {Component, signal} from '@angular/core';
import {DepartmentColumnsData, DepartmentService, DepartmentType} from '../../services/department';
import {MenuOptionType} from '../menu-option/menu-option';
import {MenuControlService} from '../../services/menu-control';
import {FormDepartment} from '../form-department/form-department';
import {Table} from '../table/table';

@Component({
  selector: 'app-list-departments',
  imports: [
    FormDepartment,
    Table
  ],
  templateUrl: './list-departments.html',
  styleUrl: './list-departments.css'
})

export class ListDepartments {
  add = signal(false)

  departmentColumns = DepartmentColumnsData
  departmentItems: DepartmentType[] = []
  departmentOption: MenuOptionType[] = [
    {
      title: "Изменить",
      action: (id: number) => this.departmentService.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.departmentService.delete(id)
    }
  ]

  constructor(private departmentService: DepartmentService, private menuControlService: MenuControlService) {
    this.add = this.menuControlService.add
    this.departmentItems = this.departmentService.list()
  }
}
