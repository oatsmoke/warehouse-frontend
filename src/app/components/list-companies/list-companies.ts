import {Component, signal} from '@angular/core';
import {CompanyColumnsData, CompanyService, CompanyType} from '../../services/company';
import {MenuOptionType} from '../menu-option/menu-option';
import {MenuControlService} from '../../services/menu-control';
import {Table} from '../table/table';
import {FormCompany} from '../form-company/form-company';

@Component({
  selector: 'app-list-companies',
  imports: [
    Table,
    FormCompany
  ],
  templateUrl: './list-companies.html',
  styleUrl: './list-companies.css'
})

export class ListCompanies {
  add = signal(false)

  companyColumns = CompanyColumnsData
  companyItems: CompanyType[] = []
  companyOption: MenuOptionType[] = [
    {
      title: "Изменить",
      action: (id: number) => this.companyService.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.companyService.delete(id)
    }
  ]

  constructor(private companyService: CompanyService, private menuControlService: MenuControlService) {
    this.add = this.menuControlService.add
    this.companyItems = this.companyService.list()
  }
}
