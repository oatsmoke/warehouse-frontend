import {Component, Input, OnChanges, signal, SimpleChanges} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MenuDepartmentType} from '../../services/menu-department';
import {MatIconModule} from '@angular/material/icon';
import {QueryParams} from '../../services/list';
import {take} from 'rxjs';
import {DepartmentService} from '../../services/department';
import {ContentStateService, State} from '../../services/content-state';

@Component({
  selector: 'app-menu-department',
  imports: [
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './menu-department.html',
  styleUrl: './menu-department.css'
})

export class MenuDepartment implements OnChanges {
  @Input() url!: string
  @Input() param!: string
  @Input() id!: string
  departmentItems: MenuDepartmentType[] = []
  protected readonly department = signal("")
  protected readonly String = String

  constructor(
    private router: Router,
    private departmentService: DepartmentService,
    private contentStateService: ContentStateService
  ) {
    this.list()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id']) {
      this.contentStateService.toggleContent(State.List)
      if (this.id == "0") {
        this.department.set("Склад")
      } else {
        const item = this.departmentItems.find(item => String(item.id) == this.id)
        if (item) {
          this.department.set(item.title)
        } else {
          this.router.navigate(['/equipment/department/0']).then()
        }
      }
    }
  }

  list() {
    const qp: QueryParams = {
      with_deleted: "false",
      search: "",
      ids: [],
      sort_column: "",
      sort_order: "",
      pagination_limit: 0,
      pagination_offset: 0,
      param: "",
      param_id: 0
    }

    this.departmentService.list(qp).pipe(take(1)).subscribe({
      next: (data) => {
        this.departmentItems = data.list
      },
      error: () => {
      }
    })
  }
}
