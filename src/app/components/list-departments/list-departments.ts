import {Component, signal} from '@angular/core';
import {DepartmentColumnsData, DepartmentService, DepartmentType} from '../../services/department';
import {MenuOptionType} from '../menu-option/menu-option';
import {FormDepartment} from '../form-department/form-department';
import {Table} from '../table/table';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {FormConfirm} from '../form-confirm/form-confirm';
import {FormEmpty} from '../form-empty/form-empty';

@Component({
  selector: 'app-list-departments',
  imports: [
    FormDepartment,
    FormConfirm,
    Table,
    FormEmpty
  ],
  templateUrl: './list-departments.html',
  styleUrl: './list-departments.css'
})

export class ListDepartments {
  content = signal(StateDefault)
  id!: number
  department!: DepartmentType
  departmentColumns = DepartmentColumnsData
  departmentItems: DepartmentType[] = []
  departmentOption: MenuOptionType[] = [
    {
      title: "Изменить",
      action: (id: number) => this.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.confirm(id)
    }
  ]
  protected readonly State = State

  constructor(
    private departmentService: DepartmentService,
    private contentStateService: ContentStateService) {
    this.content = this.contentStateService.content
    this.departmentItems = this.departmentService.list()
  }

  update(id: number) {
    let d = this.departmentService.read(id)
    if (d) {
      this.department = d
      this.contentStateService.toggleContent(State.Update)
    } else {
      console.log(`объект ID = ${id} не найден`)
    }
  }

  confirm(id: number) {
    this.id = id
    this.contentStateService.toggleContent(State.Confirm)
  }

  delete(id: number) {
    this.departmentService.delete(id)
  }
}
