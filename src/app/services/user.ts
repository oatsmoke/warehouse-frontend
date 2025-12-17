import {Injectable} from '@angular/core';
import {TableColumnsType} from '../components/table/table';
import {EmployeeType} from './employee';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface UserType {
  id: number
  username: string
  email: string
  role: number
  enabled: string
  last_login_at: string
  employee_id: number
  employee_name: string
  employee: EmployeeType
}

export interface UserList {
  list: UserType[]
  total: number
}

export const UserColumnsData: TableColumnsType[] = [
  {
    column_def: "username",
    header: "Имя",
    cell: (cell: UserType) => `${cell.username}`,
  },
  {
    column_def: "email",
    header: "Email",
    cell: (cell: UserType) => `${cell.email}`
  },
  {
    column_def: "role",
    header: "Роль",
    cell: (cell: UserType) => `${cell.role}`
  },
  {
    column_def: "enabled",
    header: "Включено",
    cell: (cell: UserType) => `${cell.enabled}`
  },
  {
    column_def: "last_login_at",
    header: "Последний вход",
    cell: (cell: UserType) => `${cell.last_login_at}`
  },
  {
    column_def: "employee",
    header: "Сотрудник",
    cell: (cell: UserType) => `${cell.employee_name}`
  }
]

const urlUsers = "/api/users"

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  create(item: UserType) {
    const url = new URL(urlUsers, environment.apiUrl)
    return this.httpClient.post<void>(url.toString(), item)
  }

  read(id: number) {
    const url = new URL(`${urlUsers}/${id}`, environment.apiUrl)
    return this.httpClient.get<UserType>(url.toString())
  }

  update(item: UserType) {
    const url = new URL(`${urlUsers}/${item.id}`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), item)
  }

  delete(id: number) {
    const url = new URL(`${urlUsers}/${id}`, environment.apiUrl)
    return this.httpClient.delete<void>(url.toString())
  }

  list() {
    const url = new URL(urlUsers, environment.apiUrl)
    return this.httpClient.get<UserType[]>(url.toString())
  }

  setPassword(id: number, old_password: string, new_password: string) {
    const url = new URL(`${urlUsers}/${id}/set_password`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), {old_password, new_password})
  }

  resetPassword(id: number) {
    const url = new URL(`${urlUsers}/${id}/reset_password`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), "")
  }

  setEnabled(id: number, enabled: boolean) {
    const url = new URL(`${urlUsers}/${id}/set_enabled`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), {enabled})
  }
}
