import {Component, signal} from '@angular/core';
import {CompanyColumnsData, CompanyService, CompanyType} from '../../services/company';
import {MenuOptionType} from '../menu-option/menu-option';
import {Table} from '../table/table';
import {FormCompany} from '../form-company/form-company';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {FormConfirm} from '../form-confirm/form-confirm';
import {FormEmpty} from '../form-empty/form-empty';

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
      action: (id: number) => this.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.confirm(id)
    }
  ]
  protected readonly State = State

  constructor(
    private companyService: CompanyService,
    private contentStateService: ContentStateService) {
    this.content = this.contentStateService.content
    this.companyItems = this.companyService.list()
  }

  update(id: number) {
    let c = this.companyService.read(id)
    if (c) {
      this.company = c
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
    this.companyService.delete(id)
  }
}
