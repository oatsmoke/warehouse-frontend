import {Component, signal} from '@angular/core';
import {FormConfirm} from "../form-confirm/form-confirm";
import {FormEmployee} from "../form-employee/form-employee";
import {FormEmpty} from "../form-empty/form-empty";
import {Table} from "../table/table";
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {EmployeeColumnsData, EmployeeService, EmployeeType} from '../../services/employee';
import {MenuOptionType} from '../menu-option/menu-option';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';
import {QueryParams} from '../../services/list';

@Component({
  selector: 'app-list-employees',
  imports: [
    FormConfirm,
    FormEmployee,
    FormEmpty,
    Table
  ],
  templateUrl: './list-employees.html',
  styleUrl: './list-employees.css'
})

export class ListEmployees {
  content = signal(StateDefault)
  id!: number
  employee!: EmployeeType
  employeeColumns = EmployeeColumnsData
  employeeItems: EmployeeType[] = []
  employeeOption: MenuOptionType[] = [
    {
      title: "Изменить",
      title_deleted: "",
      action: (id: number) => this.update(id)
    },
    {
      title: "Удалить",
      title_deleted: "Восстановить",
      action: (id: number, deleted: string) => !deleted ? this.confirm(id) : this.restore(id)
    }
  ]
  protected readonly State = State

  constructor(
    private employeeService: EmployeeService,
    private contentStateService: ContentStateService,
    private snackBarService: SnackBarService
  ) {
    this.content = this.contentStateService.content
    this.list()
  }

  update(id: number) {
    this.employeeService.read(id).pipe(take(1)).subscribe({
      next: (data) => {
        this.employee = data
        this.contentStateService.toggleContent(State.Update)
      },
      error: () => {
      }
    })
  }

  confirm(id: number) {
    this.id = id
    this.contentStateService.toggleContent(State.Confirm)
  }

  delete(id: number) {
    this.employeeService.delete(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Сотрудник удален!")
        this.list()
      },
      error: () => {
      }
    })
  }

  restore(id: number) {
    this.employeeService.restore(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Сотрудник восстановлен!")
        this.list()
      },
      error: () => {
      }
    })
  }

  list() {
    const qp: QueryParams = {
      with_deleted: "true",
      search: "",
      ids: [],
      sort_column: "",
      sort_order: "",
      pagination_limit: 0,
      pagination_offset: 0,
      param: "",
      param_id: 0
    }

    this.employeeService.list(qp).pipe(take(1)).subscribe({
      next: (data) => {
        this.employeeItems = data.list
      },
      error: () => {
      }
    })
  }
}
