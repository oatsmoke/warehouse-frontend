import {Injectable} from '@angular/core';
import {TableColumnsType} from '../components/table/table';

export interface CompanyType {
  id: number
  title: string
  deleted_at: string
}

export const CompanyColumnsData: TableColumnsType[] = [
  {
    column_def: "title",
    header: "Название",
    cell: (cell: CompanyType) => `${cell.title}`
  },
  {
    column_def: "deleted_at",
    header: "Удалено",
    cell: (cell: CompanyType) => `${cell.deleted_at}`
  }
]

export const CompanyData: CompanyType[] = [
  {
    id: 1,
    title: "omkc",
    deleted_at: ""
  },
  {
    id: 2,
    title: "mts",
    deleted_at: ""
  },
  {
    id: 3,
    title: "megafon",
    deleted_at: ""
  }
]

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  details(id: number) {
    console.log('Подробнее о компании', id)
  }

  update(id: number) {
    console.log('Редактировать компанию', id)
  }

  delete(id: number) {
    console.log('Удалить компанию', id)
  }

  create(item: CompanyType) {
    console.log(item)
  }
}
