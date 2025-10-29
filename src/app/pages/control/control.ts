import {Component, signal} from '@angular/core';
import {Table} from '../../components/table/table';
import {ActivatedRoute} from '@angular/router';
import {CategoryColumnsData, CategoryData, CategoryService} from '../../services/category';
import {ProfileColumnsData, ProfileData, ProfileService} from '../../services/profile';
import {MenuOptionType} from '../../components/menu-option/menu-option';
import {CategoryForm} from '../../components/category-form/category-form';
import {ProfileForm} from '../../components/profile-form/profile-form';
import {MenuControlService} from '../../services/menu-control';

@Component({
  selector: 'app-control',
  imports: [
    Table,
    CategoryForm,
    ProfileForm,
  ],
  templateUrl: './control.html',
  styleUrl: './control.css'
})

export class Control {
  id!: string
  add = signal(false)

  categoryColumns = CategoryColumnsData
  categoryItems = CategoryData
  categoryOption: MenuOptionType[] = [
    {
      title: "Подробнее",
      action: (id: number) => this.categoryService.details(id)
    },
    {
      title: "Изменить",
      action: (id: number) => this.categoryService.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.categoryService.delete(id)
    }
  ]

  profileColumns = ProfileColumnsData
  profileItems = ProfileData
  profileOption: MenuOptionType[] = [
    {
      title: "Подробнее",
      action: (id: number) => this.profileService.details(id)
    },
    {
      title: "Изменить",
      action: (id: number) => this.profileService.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.profileService.delete(id)
    }
  ]

  constructor(private route: ActivatedRoute,
              private menuControlService: MenuControlService,
              private categoryService: CategoryService,
              private profileService: ProfileService) {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id') || ""
    })

    this.add = this.menuControlService.add
  }
}
