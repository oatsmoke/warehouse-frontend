import {Injectable} from '@angular/core';
import {ProfileType} from './profile';
import {TableColumnsType} from '../components/table/table';
import {environment} from '../../environments/environment';
import {ListService, QueryParams} from './list';
import {HttpClient} from '@angular/common/http';

export interface EquipmentType {
  id: number
  serial_number: string
  profile_id: number
  profile: ProfileType
  deleted_at: string
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
  constructor(
    private httpClient: HttpClient,
    private listService: ListService
  ) {
  }

  create(item: EquipmentType) {
    const url = new URL(urlEquipment, environment.apiUrl)
    return this.httpClient.post<void>(url.toString(), item)
  }

  read(id: number) {
    const url = new URL(`${urlEquipment}/${id}`, environment.apiUrl)
    return this.httpClient.get<EquipmentType>(url.toString())
  }

  update(item: ProfileType) {
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
    const url = this.listService.buildQuery(new URL(urlEquipment, environment.apiUrl), qp)
    return this.httpClient.get<EquipmentList>(url.toString())
  }
}
