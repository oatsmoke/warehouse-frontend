import {Component, signal} from '@angular/core';
import {CategoryColumnsData, CategoryService, CategoryType} from '../../services/category';
import {MenuOptionType} from '../menu-option/menu-option';
import {FormCategory} from '../form-category/form-category';
import {Table} from '../table/table';
import {MenuControlService} from '../../services/menu-control';

@Component({
  selector: 'app-list-categories',
  imports: [
    FormCategory,
    Table
  ],
  templateUrl: './list-categories.html',
  styleUrl: './list-categories.css'
})

export class ListCategories {
  add = signal(false)

  categoryColumns = CategoryColumnsData
  categoryItems: CategoryType[] = []
  categoryOption: MenuOptionType[] = [
    {
      title: "Изменить",
      action: (id: number) => this.categoryService.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.categoryService.delete(id)
    }
  ]

  constructor(private categoryService: CategoryService, private menuControlService: MenuControlService) {
    this.add = this.menuControlService.add
    this.categoryItems = this.categoryService.list()
  }
}
