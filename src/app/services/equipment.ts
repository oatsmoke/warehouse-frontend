import {Injectable, signal} from '@angular/core';
import {ProfileType} from './profile';
import {TableColumnsType} from '../components/table/table';
import {environment} from '../../environments/environment';
import {ListService, QueryParams} from './list';
import {HttpClient} from '@angular/common/http';
import {CompanyType} from './company';

export interface EquipmentType {
  id: number
  company_id: number
  company: CompanyType
  profile_id: number
  profile: ProfileType
  serial_number: string
  deleted_at: string
}

export interface CreateEquipment {
  date: Date
  company_id: number
  profile_id: number
  serial_numbers: string[]
  param: string
  param_id: number
}

export interface UpdateEquipment {
  id: number
  company_id: number
  profile_id: number
  serial_number: string
}

export interface EquipmentList {
  list: EquipmentType[]
  total: number
}

export const EquipmentColumnsData: TableColumnsType[] = [
  {
    column_def: "title",
    header: "Модель",
    cell: (cell: EquipmentType) => `${cell.profile.title}`
  },
  {
    column_def: "serial_number",
    header: "Серийный номер",
    cell: (cell: EquipmentType) => `${cell.serial_number}`
  },
  {
    column_def: "category",
    header: "Категория",
    cell: (cell: EquipmentType) => `${cell.profile.category.title}`
  }
]

const urlEquipment = "/api/equipments"

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {
  param = signal("")
  paramId = signal(0)

  constructor(
    private httpClient: HttpClient,
    private listService: ListService
  ) {
  }

  create(item: CreateEquipment) {
    const url = new URL(urlEquipment, environment.apiUrl)
    return this.httpClient.post<void>(url.toString(), item)
  }

  read(id: number) {
    const url = new URL(`${urlEquipment}/${id}`, environment.apiUrl)
    return this.httpClient.get<EquipmentType>(url.toString())
  }

  update(item: UpdateEquipment) {
    const url = new URL(`${urlEquipment}/${item.id}`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), item)
  }

  delete(id: number) {
    const url = new URL(`${urlEquipment}/${id}`, environment.apiUrl)
    return this.httpClient.delete<void>(url.toString())
  }

  restore(id: number) {
    const url = new URL(`${urlEquipment}/${id}/restore`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), "")
  }

  list(qp: QueryParams) {
    // const url = this.listService.buildQuery(new URL(urlEquipment, environment.apiUrl), qp)
    const url = this.listService.buildQuery(new URL("/api/locations", environment.apiUrl), qp)
    return this.httpClient.get<EquipmentList>(url.toString())
  }
}
