import {Component, signal} from '@angular/core';
import {CategoryColumnsData, CategoryService, CategoryType} from '../../services/category';
import {MenuOptionType} from '../menu-option/menu-option';
import {FormCategory} from '../form-category/form-category';
import {Table} from '../table/table';
import {FormConfirm} from '../form-confirm/form-confirm';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {FormEmpty} from '../form-empty/form-empty';
import {take} from 'rxjs';
import {SnackBarService} from '../../services/snack-bar';

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
      title_deleted: "",
      action: (id: number) => this.update(id)
    },
    {
      title: "Удалить",
      title_deleted: "Восстановить",
      action: (id: number, deleted: string) => !deleted ? this.confirm(id) : this.restore(id)
    }
  ]
  protected readonly State = State

  constructor(
    private categoryService: CategoryService,
    private contentStateService: ContentStateService,
    private snackBarService: SnackBarService
  ) {
    this.content = this.contentStateService.content
    this.list()
  }

  update(id: number) {
    this.categoryService.read(id).pipe(take(1)).subscribe({
      next: (data) => {
        this.category = data
        this.contentStateService.toggleContent(State.Update)
      },
      error: () => {
      }
    })
  }

  confirm(id: number) {
    this.id = id
    this.contentStateService.toggleContent(State.Confirm)
  }

  delete(id: number) {
    this.categoryService.delete(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Категория удалена!")
      },
      error: () => {
      }
    })
  }

  restore(id: number) {
    this.categoryService.restore(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Категория восстановлена!")
      },
      error: () => {
      }
    })
  }

  list() {
    this.categoryService.list().pipe(take(1)).subscribe({
      next: (data) => {
        this.categoryItems = data.list
      },
      error: () => {
      }
    })
  }
}
