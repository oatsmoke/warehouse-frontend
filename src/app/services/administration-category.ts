import {Injectable, signal, WritableSignal} from '@angular/core';
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

export const CategoryData: CategoryType[] = [
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

export class AdministrationCategoryService {
  add: WritableSignal<boolean> = signal(false)

  details(id: number) {
    console.log('Подробнее о категории', id)
  }

  update(id: number) {
    console.log('Редактировать категорию', id)
  }

  delete(id: number) {
    console.log('Удалить категорию', id)
  }

  toggleAdd() {
    this.add.set(!this.add())
  }

  create(item: CategoryType) {
    console.log(item)
  }
}
