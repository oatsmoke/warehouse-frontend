import {Component, signal} from '@angular/core';
import {FormProfile} from "../form-profile/form-profile";
import {Table} from "../table/table";
import {ProfileColumnsData, ProfileService, ProfileType} from '../../services/profile';
import {MenuOptionType} from '../menu-option/menu-option';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {FormConfirm} from '../form-confirm/form-confirm';
import {FormEmpty} from '../form-empty/form-empty';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';
import {QueryParams} from '../../services/list';

@Component({
  selector: 'app-list-profiles',
  imports: [
    FormProfile,
    FormConfirm,
    Table,
    FormEmpty
  ],
  templateUrl: './list-profiles.html',
  styleUrl: './list-profiles.css'
})

export class ListProfiles {
  content = signal(StateDefault)
  id!: number
  profile!: ProfileType
  profileColumns = ProfileColumnsData
  profileItems: ProfileType[] = []
  profileOption: MenuOptionType[] = [
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
    private profileService: ProfileService,
    private contentStateService: ContentStateService,
    private snackBarService: SnackBarService
  ) {
    this.content = this.contentStateService.content
    this.list()
  }

  update(id: number) {
    this.profileService.read(id).pipe(take(1)).subscribe({
      next: (data) => {
        this.profile = data
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
    this.profileService.delete(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Профиль удален!")
        this.list()
      },
      error: () => {
      }
    })
  }

  restore(id: number) {
    this.profileService.restore(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Профиль восстановлен!")
        this.list()
      },
      error: () => {
      }
    })
  }

  list() {
    const qp: QueryParams = {
      with_deleted: "true",
      search: "",
      ids: [],
      sort_column: "",
      sort_order: "",
      pagination_limit: 0,
      pagination_offset: 0,
      param: "",
      param_id: 0
    }

    this.profileService.list(qp).pipe(take(1)).subscribe({
      next: (data) => {
        this.profileItems = data.list
      },
      error: () => {
      }
    })
  }
}
