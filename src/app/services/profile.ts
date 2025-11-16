import {Injectable} from '@angular/core';
import {CategoryType} from './category';
import {TableColumnsType} from '../components/table/table';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface ProfileType {
  id: number
  title: string
  category: CategoryType
  deleted_at: string
}

export interface ProfileList {
  list: ProfileType[]
  total: number
}

export const ProfileColumnsData: TableColumnsType[] = [
  {
    column_def: "title",
    header: "Название",
    cell: (cell: ProfileType) => `${cell.title}`
  },
  {
    column_def: "category",
    header: "Категория",
    cell: (cell: ProfileType) => `${cell.category.title}`
  },
  {
    column_def: "deleted_at",
    header: "Удалено",
    cell: (cell: ProfileType) => `${cell.deleted_at}`
  }
]

const urlProfiles = "/api/profiles"

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  constructor(private httpClient: HttpClient) {
  }

  create(item: ProfileType) {
    const url = new URL(urlProfiles, environment.apiUrl)
    return this.httpClient.post<void>(url.toString(), item)
  }

  read(id: number) {
    const url = new URL(`${urlProfiles}/${id}`, environment.apiUrl)
    return this.httpClient.get<ProfileType>(url.toString())
  }

  update(item: ProfileType) {
    const url = new URL(`${urlProfiles}/${item.id}`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), item)
  }

  delete(id: number) {
    const url = new URL(`${urlProfiles}/${id}`, environment.apiUrl)
    return this.httpClient.delete<void>(url.toString())
  }

  restore(id: number) {
    const url = new URL(`${urlProfiles}/${id}/restore`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), "")
  }

  list() {
    const url = new URL(urlProfiles, environment.apiUrl)
    url.searchParams.set("deleted", "true")
    return this.httpClient.get<ProfileList>(url.toString())
  }
}
