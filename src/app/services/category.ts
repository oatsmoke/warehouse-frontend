import {Injectable} from '@angular/core';
import {TableColumnsType} from '../components/table/table';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface CategoryType {
  id: number
  title: string
  deleted_at: string
}

export interface CategoryList {
  list: CategoryType[]
  total: number
}

export const CategoryColumnsData: TableColumnsType[] = [
  {
    column_def: "title",
    header: "Название",
    cell: (cell: CategoryType) => `${cell.title}`
  },
  {
    column_def: "deleted_at",
    header: "Удалено",
    cell: (cell: CategoryType) => `${cell.deleted_at}`
  }
]

const urlCategories = "/api/categories"

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(private httpClient: HttpClient) {
  }

  create(item: CategoryType) {
    const url = new URL(urlCategories, environment.apiUrl)
    return this.httpClient.post<void>(url.toString(), item)
  }

  read(id: number) {
    const url = new URL(`${urlCategories}/${id}`, environment.apiUrl)
    return this.httpClient.get<CategoryType>(url.toString())
  }

  update(item: CategoryType) {
    const url = new URL(`${urlCategories}/${item.id}`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), item)
  }

  delete(id: number) {
    const url = new URL(`${urlCategories}/${id}`, environment.apiUrl)
    return this.httpClient.delete<void>(url.toString())
  }

  restore(id: number) {
    const url = new URL(`${urlCategories}/${id}/restore`, environment.apiUrl)
    return this.httpClient.put<void>(url.toString(), "")
  }

  list() {
    const url = new URL(urlCategories, environment.apiUrl)
    url.searchParams.set("deleted", "true")
    return this.httpClient.get<CategoryList>(url.toString())
  }
}
