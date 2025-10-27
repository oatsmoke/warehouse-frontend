import {Injectable} from '@angular/core';

export interface MenuLeftType {
  link: string
  param: string
  icon: string
  text: string
}

export const MenuLeftData: MenuLeftType[] = [
  {
    link: "/equipment",
    param: "department",
    icon: "storage",
    text: "Отделы"
  },
  {
    link: "/equipment",
    param: "contract",
    icon: "groups",
    text: "Абоненты"
  },
  {
    link: "/search",
    param: "",
    icon: "search",
    text: "Поиск"
  },
  {
    link: "/control",
    param: "administration",
    icon: "settings_applications",
    text: "Управление"
  },
  {
    link: "/settings",
    param: "",
    icon: "settings",
    text: "Настройки"
  }
]

@Injectable({
  providedIn: 'root'
})

export class MenuLeftService {
}
