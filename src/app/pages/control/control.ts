import {Component, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuControlService} from '../../services/menu-control';
import {ListCategories} from '../../components/list-categories/list-categories';
import {ListProfiles} from '../../components/list-profiles/list-profiles';
import {ListCompanies} from '../../components/list-companies/list-companies';
import {ListDepartments} from '../../components/list-departments/list-departments';

@Component({
  selector: 'app-control',
  imports: [
    ListCategories,
    ListProfiles,
    ListCompanies,
    ListDepartments,
  ],
  templateUrl: './control.html',
  styleUrl: './control.css'
})

export class Control {
  id!: string
  add = signal(false)

  constructor(private route: ActivatedRoute,
              private menuControlService: MenuControlService) {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id') || ""
    })

    this.add = this.menuControlService.add
  }
}
