import {Injectable} from '@angular/core';
import {CategoryType} from './category';
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

const ProfileData: ProfileType[] = [
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

export class ProfileService {
  create(item: ProfileType) {
    console.log("create", item)
  }

  read(id: number): ProfileType | undefined {
    return ProfileData.find(c => c.id === id)
  }

  update(item: ProfileType) {
    console.log("update", item)
  }

  delete(id: number) {
    console.log("delete", id)
  }

  restore(id: number) {
    console.log("restore", id)
  }

  list(): ProfileType[] {
    return ProfileData
  }
}
