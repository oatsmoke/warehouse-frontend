import {Component, signal} from '@angular/core';
import {CategoryColumnsData, CategoryService, CategoryType} from '../../services/category';
import {MenuOptionType} from '../menu-option/menu-option';
import {FormCategory} from '../form-category/form-category';
import {Table} from '../table/table';
import {FormConfirm} from '../form-confirm/form-confirm';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {FormEmpty} from '../form-empty/form-empty';

@Component({
  selector: 'app-list-categories',
  imports: [
    FormCategory,
    FormConfirm,
    Table,
    FormEmpty
  ],
  templateUrl: './list-categories.html',
  styleUrl: './list-categories.css'
})

export class ListCategories {
  content = signal(StateDefault)
  id!: number
  category!: CategoryType
  categoryColumns = CategoryColumnsData
  categoryItems: CategoryType[] = []
  categoryOption: MenuOptionType[] = [
    {
      title: "Изменить",
      action: (id: number) => this.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.confirm(id)
    }
  ]
  protected readonly State = State

  constructor(
    private categoryService: CategoryService,
    private contentStateService: ContentStateService) {
    this.content = this.contentStateService.content
    this.categoryItems = this.categoryService.list()
  }

  update(id: number) {
    let c = this.categoryService.read(id)
    if (c) {
      this.category = c
      this.contentStateService.toggleContent(State.Update)
    } else {
      console.log(`объект ID = ${id} не найден`)
    }
  }

  confirm(id: number) {
    this.id = id
    this.contentStateService.toggleContent(State.Confirm)
  }

  delete(id: number) {
    this.categoryService.delete(id)
  }
}
