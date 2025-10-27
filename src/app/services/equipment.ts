import {Injectable} from '@angular/core';
import {ProfileType} from './administration-profile';
import {TableColumnsType} from '../components/table/table';

export interface EquipmentType {
  id: number
  serial_number: string
  profile: ProfileType
  deleted_at: string
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

export const EquipmentData: EquipmentType[] = [
  {
    id: 1,
    serial_number: "123qaz",
    profile: {
      id: 1,
      title: "dir-300",
      category: {
        id: 1,
        title: "router",
        deleted_at: ""
      },
      deleted_at: ""
    },
    deleted_at: ""
  },
  {
    id: 2,
    serial_number: "123wsx",
    profile: {
      id: 1,
      title: "dir-300",
      category: {
        id: 1,
        title: "router",
        deleted_at: ""
      },
      deleted_at: ""
    },
    deleted_at: ""
  },
  {
    id: 3,
    serial_number: "123edc",
    profile: {
      id: 1,
      title: "dir-300",
      category: {
        id: 1,
        title: "router",
        deleted_at: ""
      },
      deleted_at: ""
    },
    deleted_at: ""
  },
  {
    id: 4,
    serial_number: "123rfv",
    profile: {
      id: 1,
      title: "dir-300",
      category: {
        id: 1,
        title: "router",
        deleted_at: ""
      },
      deleted_at: ""
    },
    deleted_at: ""
  },
  {
    id: 5,
    serial_number: "123tgb",
    profile: {
      id: 1,
      title: "dir-300",
      category: {
        id: 1,
        title: "router",
        deleted_at: ""
      },
      deleted_at: ""
    },
    deleted_at: ""
  },
  {
    id: 7,
    serial_number: "111qqq",
    profile: {
      id: 3,
      title: "conax",
      category: {
        id: 2,
        title: "CAM-module",
        deleted_at: ""
      },
      deleted_at: ""
    },
    deleted_at: ""
  },
  {
    id: 8,
    serial_number: "222www",
    profile: {
      id: 3,
      title: "conax",
      category: {
        id: 2,
        title: "CAM-module",
        deleted_at: ""
      },
      deleted_at: ""
    },
    deleted_at: ""
  }
]

@Injectable({
  providedIn: 'root'
})

export class EquipmentService {
  details(id: number) {
    console.log('Подробнее об оборудовании', id)
  }

  update(id: number) {
    console.log('Редактировать оборудование', id)
  }

  delete(id: number) {
    console.log('Удалить оборудование', id)
  }
}
