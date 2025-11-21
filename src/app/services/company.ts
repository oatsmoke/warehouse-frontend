import {Injectable} from '@angular/core';
import {TableColumnsType} from '../components/table/table';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ListService, QueryParams} from './list';

export interface CompanyType {
  id: number
  title: string
  deleted_at: string
}

export interface CompanyList {
  list: CompanyType[]
  total: number
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

const urlCompanies = "/api/companies"

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  constructor(
    private httpClient: HttpClient,
    private listService: ListService
  ) {
  }

  create(item: CompanyType) {
    const url = new URL(urlCompanies, environment.apiUrl)
    return this.httpClient.post<void>(url.toString(), item)
  }

  read(id: number) {
    const url = new URL(`${urlCompanies}/${id}`, environment.apiUrl)
    return this.httpClient.get<CompanyType>(url.toString())
  }

  update(item: CompanyType) {
    const url = new URL(`${urlCompanies}/${item.id}`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), item)
  }

  delete(id: number) {
    const url = new URL(`${urlCompanies}/${id}`, environment.apiUrl)
    return this.httpClient.delete<void>(url.toString())
  }

  restore(id: number) {
    const url = new URL(`${urlCompanies}/${id}/restore`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), "")
  }

  list(qp: QueryParams) {
    const url = this.listService.buildQuery(new URL(urlCompanies, environment.apiUrl), qp)
    return this.httpClient.get<CompanyList>(url.toString())
  }
}
