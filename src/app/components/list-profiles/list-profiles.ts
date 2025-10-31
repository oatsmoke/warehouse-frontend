import {Component, signal} from '@angular/core';
import {FormProfile} from "../form-profile/form-profile";
import {Table} from "../table/table";
import {ProfileColumnsData, ProfileService, ProfileType} from '../../services/profile';
import {MenuOptionType} from '../menu-option/menu-option';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {FormConfirm} from '../form-confirm/form-confirm';

@Component({
  selector: 'app-list-profiles',
  imports: [
    FormProfile,
    FormConfirm,
    Table
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
      action: (id: number) => this.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.confirm(id)
    }
  ]
  protected readonly State = State

  constructor(
    private profileService: ProfileService,
    private contentStateService: ContentStateService) {
    this.content = this.contentStateService.content
    this.profileItems = this.profileService.list()
  }

  update(id: number) {
    let c = this.profileService.read(id)
    if (c) {
      this.profile = c
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
    this.profileService.delete(id)
  }
}
