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

export const DepartmentData: DepartmentType[] = [
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
  details(id: number) {
    console.log('Подробнее об отделе', id)
  }

  update(id: number) {
    console.log('Редактировать отдел', id)
  }

  delete(id: number) {
    console.log('Удалить отдел', id)
  }

  create(item: DepartmentType) {
    console.log(item)
  }
}
