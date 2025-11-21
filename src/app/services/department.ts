import {Injectable} from '@angular/core';
import {TableColumnsType} from '../components/table/table';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ListService, QueryParams} from './list';

export interface DepartmentType {
  id: number
  title: string
  deleted_at: string
}

export interface DepartmentList {
  list: DepartmentType[]
  total: number
}

export const DepartmentColumnsData: TableColumnsType[] = [
  {
    column_def: "title",
    header: "Название",
    cell: (cell: DepartmentType) => `${cell.title}`
  },
  {
    column_def: "deleted_at",
    header: "Удалено",
    cell: (cell: DepartmentType) => `${cell.deleted_at}`
  }
]

const urlDepartments = "/api/departments"

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  constructor(
    private httpClient: HttpClient,
    private listService: ListService
  ) {
  }

  create(item: DepartmentType) {
    const url = new URL(urlDepartments, environment.apiUrl)
    return this.httpClient.post<void>(url.toString(), item)
  }

  read(id: number) {
    const url = new URL(`${urlDepartments}/${id}`, environment.apiUrl)
    return this.httpClient.get<DepartmentType>(url.toString())
  }

  update(item: DepartmentType) {
    const url = new URL(`${urlDepartments}/${item.id}`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), item)
  }

  delete(id: number) {
    const url = new URL(`${urlDepartments}/${id}`, environment.apiUrl)
    return this.httpClient.delete<void>(url.toString())
  }

  restore(id: number) {
    const url = new URL(`${urlDepartments}/${id}/restore`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), "")
  }

  list(qp: QueryParams) {
    const url = this.listService.buildQuery(new URL(urlDepartments, environment.apiUrl), qp)
    return this.httpClient.get<DepartmentList>(url.toString())
  }
}
