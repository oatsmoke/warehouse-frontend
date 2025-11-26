import {Injectable} from '@angular/core';
import {TableColumnsType} from '../components/table/table';
import {DepartmentType} from './department';
import {HttpClient} from '@angular/common/http';
import {ListService, QueryParams} from './list';
import {environment} from '../../environments/environment';

export interface EmployeeType {
  id: number
  last_name: string
  first_name: string
  middle_name: string
  phone: string
  department_id: number
  department: DepartmentType
  deleted_at: string
}

export interface EmployeeList {
  list: EmployeeType[]
  total: number
}

export const EmployeeColumnsData: TableColumnsType[] = [
  {
    column_def: "name",
    header: "Имя",
    cell: (cell: EmployeeType) => `${cell.last_name} ${cell.first_name} ${cell.last_name}`,
  },
  {
    column_def: "phone",
    header: "Телефон",
    cell: (cell: EmployeeType) => `${cell.phone}`
  },
  {
    column_def: "department",
    header: "Отдел",
    cell: (cell: EmployeeType) => `${cell.department.title}`
  },
  {
    column_def: "deleted_at",
    header: "Удалено",
    cell: (cell: EmployeeType) => `${cell.deleted_at}`
  }
]

const urlEmployees = "/api/employees"

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  constructor(
    private httpClient: HttpClient,
    private listService: ListService
  ) {
  }

  create(item: EmployeeType) {
    console.log(item);
    const url = new URL(urlEmployees, environment.apiUrl)
    return this.httpClient.post<void>(url.toString(), item)
  }

  read(id: number) {
    const url = new URL(`${urlEmployees}/${id}`, environment.apiUrl)
    return this.httpClient.get<EmployeeType>(url.toString())
  }

  update(item: EmployeeType) {
    const url = new URL(`${urlEmployees}/${item.id}`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), item)
  }

  delete(id: number) {
    const url = new URL(`${urlEmployees}/${id}`, environment.apiUrl)
    return this.httpClient.delete<void>(url.toString())
  }

  restore(id: number) {
    const url = new URL(`${urlEmployees}/${id}/restore`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), "")
  }

  list(qp: QueryParams) {
    const url = this.listService.buildQuery(new URL(urlEmployees, environment.apiUrl), qp)
    return this.httpClient.get<EmployeeList>(url.toString())
  }

  setDepartment(id: number, department_id: number) {
    const url = new URL(`${urlEmployees}/${id}/set_department`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), {department_id})
  }
}
