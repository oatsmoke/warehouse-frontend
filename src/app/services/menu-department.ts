import {Injectable} from '@angular/core';

export interface MenuDepartmentType {
  id: number;
  title: string;
}

export const MenuDepartmentData: MenuDepartmentType[] = [
  {
    id: 1,
    title: "1 участок"
  },
  {
    id: 2,
    title: "2 участок"
  },
  {
    id: 3,
    title: "3 участок"
  },
  {
    id: 4,
    title: "4 участок"
  }
]

@Injectable({
  providedIn: 'root'
})

export class MenuDepartmentService {
}
