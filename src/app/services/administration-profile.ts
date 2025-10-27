import {Injectable} from '@angular/core';
import {CategoryType} from './administration-category';
import {TableColumnsType} from '../components/table/table';

export interface ProfileType {
  id: number
  title: string
  category: CategoryType
  deleted_at: string
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

export const ProfileData: ProfileType[] = [
  {
    id: 1,
    title: "dir-300",
    category: {
      id: 1,
      title: "router",
      deleted_at: ""
    },
    deleted_at: ""
  },
  {
    id: 2,
    title: "tl-wr840",
    category: {
      id: 1,
      title: "router",
      deleted_at: ""
    },
    deleted_at: ""
  },
  {
    id: 3,
    title: "conax",
    category: {
      id: 2,
      title: "CAM-module",
      deleted_at: ""
    },
    deleted_at: ""
  }
]

@Injectable({
  providedIn: 'root'
})

export class AdministrationProfileService {
  details(id: number) {
    console.log('Подробнее о профиле', id)
  }

  update(id: number) {
    console.log('Редактировать профиль', id)
  }

  delete(id: number) {
    console.log('Удалить профиль', id)
  }
}
