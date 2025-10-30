import {Injectable} from '@angular/core';
import {TableColumnsType} from '../components/table/table';

export interface DepartmentType {
  id: number
  title: string
  deleted_at: string
}

export const DepartmentColumnsData: TableColumnsType[] = [
  {
    column_def: "title",
    header: "Название",
    cell: (cell: DepartmentType) => `${cell.title}`
  },
  {
    column_def: "deleted_at",
    header: "Удалено",
    cell: (cell: DepartmentType) => `${cell.deleted_at}`
  }
]

const DepartmentData: DepartmentType[] = [
  {
    id: 1,
    title: "1 участок",
    deleted_at: ""
  },
  {
    id: 2,
    title: "2 участок",
    deleted_at: ""
  },
  {
    id: 3,
    title: "3 участок",
    deleted_at: ""
  }
]

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  create(item: DepartmentType) {
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

  list(): DepartmentType[] {
    return DepartmentData
  }
}
