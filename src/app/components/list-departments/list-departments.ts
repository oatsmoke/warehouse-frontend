import {Component, signal} from '@angular/core';
import {DepartmentColumnsData, DepartmentService, DepartmentType} from '../../services/department';
import {MenuOptionType} from '../menu-option/menu-option';
import {FormDepartment} from '../form-department/form-department';
import {Table} from '../table/table';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {FormConfirm} from '../form-confirm/form-confirm';
import {FormEmpty} from '../form-empty/form-empty';
import {take} from 'rxjs';
import {SnackBarService} from '../../services/snack-bar';
import {QueryParams} from '../../services/list';

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
    private departmentService: DepartmentService,
    private contentStateService: ContentStateService,
    private snackBarService: SnackBarService
  ) {
    this.content = this.contentStateService.content
    this.list()
  }

  update(id: number) {
    this.departmentService.read(id).pipe(take(1)).subscribe({
      next: (data) => {
        this.department = data
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
    this.departmentService.delete(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Отдел удален!")
        this.list()
      },
      error: () => {
      }
    })
  }

  restore(id: number) {
    this.departmentService.restore(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Отдел восстановлен!")
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

    this.departmentService.list(qp).pipe(take(1)).subscribe({
      next: (data) => {
        this.departmentItems = data.list
      },
      error: () => {
      }
    })
  }
}
