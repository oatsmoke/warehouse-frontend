import {Component, signal} from '@angular/core';
import {FormProfile} from "../form-profile/form-profile";
import {Table} from "../table/table";
import {ProfileColumnsData, ProfileService, ProfileType} from '../../services/profile';
import {MenuOptionType} from '../menu-option/menu-option';
import {MenuControlService} from '../../services/menu-control';

@Component({
  selector: 'app-list-profiles',
  imports: [
    FormProfile,
    Table
  ],
  templateUrl: './list-profiles.html',
  styleUrl: './list-profiles.css'
})

export class ListProfiles {
  add = signal(false)

  profileColumns = ProfileColumnsData
  profileItems: ProfileType[] = []
  profileOption: MenuOptionType[] = [
    {
      title: "Изменить",
      action: (id: number) => this.profileService.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.profileService.delete(id)
    }
  ]

  constructor(private profileService: ProfileService, private menuControlService: MenuControlService) {
    this.add = this.menuControlService.add
    this.profileItems = this.profileService.list()
  }
}
