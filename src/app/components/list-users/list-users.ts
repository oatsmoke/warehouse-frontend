import {Component, signal} from '@angular/core';
import {FormConfirm} from '../form-confirm/form-confirm';
import {Table} from '../table/table';
import {FormEmpty} from '../form-empty/form-empty';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {FormUser} from '../form-user/form-user';
import {MenuOptionType} from '../menu-option/menu-option';
import {UserColumnsData, UserService, UserType} from '../../services/user';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';

@Component({
  selector: 'app-list-users',
  imports: [
    FormConfirm,
    Table,
    FormEmpty,
    FormUser
  ],
  templateUrl: './list-users.html',
  styleUrl: './list-users.css'
})

export class ListUsers {
  content = signal(StateDefault)
  id!: number
  user!: UserType
  userColumns = UserColumnsData
  userItems: UserType[] = []
  userOption: MenuOptionType[] = [
    {
      title: "Сбросить пароль",
      title_deleted: "",
      action: (id: number) => this.resetPassword(id)
    },
    {
      title: "Разблокировать",
      title_deleted: "Заблокировать",
      action: (id: number, deleted: string) => deleted ? this.setEnabled(id, false) : this.setEnabled(id, true)
    },
    {
      title: "Изменить",
      title_deleted: "",
      action: (id: number) => this.update(id)
    },
    {
      title: "Удалить",
      title_deleted: "",
      action: (id: number) => this.confirm(id)
    }
  ]
  protected readonly State = State

  constructor(
    private userService: UserService,
    private contentStateService: ContentStateService,
    private snackBarService: SnackBarService
  ) {
    this.content = this.contentStateService.content
    this.list()
  }

  update(id: number) {
    this.userService.read(id).pipe(take(1)).subscribe({
      next: (data) => {
        this.user = data
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
    this.userService.delete(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Пользователь удален!")
        this.list()
      },
      error: () => {
      }
    })
  }

  list() {
    this.userService.list().pipe(take(1)).subscribe({
      next: (data) => {
        this.userItems = data
      },
      error: () => {
      }
    })
  }

  setEnabled(id: number, enabled: boolean) {
    this.userService.setEnabled(id, enabled).pipe(take(1)).subscribe({
      next: (data) => {
        if (enabled) {
          this.snackBarService.success("Пользователь разблокирован!")
        } else {
          this.snackBarService.success("Пользователь заблокирован!")
        }
        this.list()
      },
      error: () => {
      }
    })
  }

  resetPassword(id: number) {
    this.userService.resetPassword(id).pipe(take(1)).subscribe({
      next: (data) => {
        this.snackBarService.success("Пароль сброшен!")
      },
      error: () => {
      }
    })
  }
}
