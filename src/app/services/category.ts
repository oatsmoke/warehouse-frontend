import {Injectable} from '@angular/core';
import {TableColumnsType} from '../components/table/table';

export interface CategoryType {
  id: number
  title: string
  deleted_at: string
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

const CategoryData: CategoryType[] = [
  {
    id: 1,
    title: "router",
    deleted_at: ""
  },
  {
    id: 2,
    title: "CAM-module",
    deleted_at: ""
  },
  {
    id: 3,
    title: "DTV set-top box",
    deleted_at: ""
  }
]

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  create(item: CategoryType) {
    console.log("создать", item)
  }

  read(id: number) {
    console.log('получить', id)
  }

  update(id: number) {
    console.log('изменить', id)
  }

  delete(id: number) {
    console.log('удалить', id)
  }

  restore(id: number) {
    console.log('восстановить', id)
  }

  list(): CategoryType[] {
    return CategoryData
  }
}
