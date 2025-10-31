import {Injectable} from '@angular/core';

export interface MenuControlType {
  id: string;
  title: string;
}

export const MenuControlData: MenuControlType[] = [
  {
    id: "category",
    title: "Категории"
  },
  {
    id: "profile",
    title: "Профили"
  },
  {
    id: "company",
    title: "Компании"
  },
  {
    id: "department",
    title: "Отделы"
  },
  {
    id: "employee",
    title: "Сотрудники"
  },
  {
    id: "user",
    title: "Пользователи"
  }
]

@Injectable({
  providedIn: 'root'
})

export class MenuControlService {
}
