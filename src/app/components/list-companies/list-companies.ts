import {Component, signal} from '@angular/core';
import {CompanyColumnsData, CompanyService, CompanyType} from '../../services/company';
import {MenuOptionType} from '../menu-option/menu-option';
import {Table} from '../table/table';
import {FormCompany} from '../form-company/form-company';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {FormConfirm} from '../form-confirm/form-confirm';
import {FormEmpty} from '../form-empty/form-empty';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';
import {QueryParams} from '../../services/list';

@Component({
  selector: 'app-list-companies',
  imports: [
    FormCompany,
    FormConfirm,
    Table,
    FormEmpty
  ],
  templateUrl: './list-companies.html',
  styleUrl: './list-companies.css'
})

export class ListCompanies {
  content = signal(StateDefault)
  id!: number
  company!: CompanyType
  companyColumns = CompanyColumnsData
  companyItems: CompanyType[] = []
  companyOption: MenuOptionType[] = [
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
    private companyService: CompanyService,
    private contentStateService: ContentStateService,
    private snackBarService: SnackBarService
  ) {
    this.content = this.contentStateService.content
    this.list()
  }

  update(id: number) {
    this.companyService.read(id).pipe(take(1)).subscribe({
      next: (data) => {
        this.company = data
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
    this.companyService.delete(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Компания удалена!")
        this.list()
      },
      error: () => {
      }
    })
  }

  restore(id: number) {
    this.companyService.restore(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Компания восстановлена!")
        this.list()
      },
      error: () => {
      }
    })
  }

  list() {
    const qp: QueryParams = {
      WithDeleted: "true",
      Search: "",
      Ids: [],
      SortColumn: "",
      SortOrder: "",
      PaginationLimit: 0,
      PaginationOffset: 0,
    }

    this.companyService.list(qp).pipe(take(1)).subscribe({
      next: (data) => {
        this.companyItems = data.list
      },
      error: () => {
      }
    })
  }
}
