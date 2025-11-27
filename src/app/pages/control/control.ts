import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ListCategories} from '../../components/list-categories/list-categories';
import {ListProfiles} from '../../components/list-profiles/list-profiles';
import {ListCompanies} from '../../components/list-companies/list-companies';
import {ListDepartments} from '../../components/list-departments/list-departments';
import {ListEmployees} from '../../components/list-employees/list-employees';
import {ListUsers} from '../../components/list-users/list-users';

@Component({
  selector: 'app-control',
  imports: [
    ListCategories,
    ListProfiles,
    ListCompanies,
    ListDepartments,
    ListEmployees,
    ListUsers,
  ],
  templateUrl: './control.html',
  styleUrl: './control.css'
})

export class Control {
  id!: string

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id') || ""
    })
  }
}
