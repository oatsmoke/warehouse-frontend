import {Component, signal} from '@angular/core';
import {Table} from '../../components/table/table';
import {ActivatedRoute} from '@angular/router';
import {AdministrationCategoryService, CategoryColumnsData, CategoryData} from '../../services/administration-category';
import {AdministrationProfileService, ProfileColumnsData, ProfileData} from '../../services/administration-profile';
import {MenuOptionType} from '../../components/menu-option/menu-option';
import {CategoryForm} from '../../components/category-form/category-form';

@Component({
  selector: 'app-control',
  imports: [
    Table,
    CategoryForm,
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
      action: (id: number) => this.administrationCategoryService.details(id)
    },
    {
      title: "Изменить",
      action: (id: number) => this.administrationCategoryService.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.administrationCategoryService.delete(id)
    }
  ]

  profileColumns = ProfileColumnsData
  profileItems = ProfileData
  profileOption: MenuOptionType[] = [
    {
      title: "Подробнее",
      action: (id: number) => this.administrationProfileService.details(id)
    },
    {
      title: "Изменить",
      action: (id: number) => this.administrationProfileService.update(id)
    },
    {
      title: "Удалить",
      action: (id: number) => this.administrationProfileService.delete(id)
    }
  ]

  constructor(private route: ActivatedRoute,
              private administrationCategoryService: AdministrationCategoryService,
              private administrationProfileService: AdministrationProfileService) {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id') || ""
    })
    this.add = this.administrationCategoryService.add
  }
}
