import {Component, inject, OnInit} from '@angular/core';
import {FormConfirm} from "../form-confirm/form-confirm";
import {FormEmpty} from "../form-empty/form-empty";
import {Table} from "../table/table";
import {ContentStateService, State} from '../../services/content-state';
import {MenuOptionType} from '../menu-option/menu-option';
import {EquipmentColumnsData, EquipmentService, EquipmentType} from '../../services/equipment';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';
import {QueryParams} from '../../services/list';
import {FormEquipmentCreate} from '../form-equipment-create/form-equipment-create';
import {FormEquipmentUpdate} from '../form-equipment-update/form-equipment-update';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-equipments',
  imports: [
    FormConfirm,
    FormEmpty,
    Table,
    FormEquipmentCreate,
    FormEquipmentUpdate
  ],
  templateUrl: './list-equipments.html',
  styleUrl: './list-equipments.css'
})

export class ListEquipments implements OnInit {
  id!: number
  equipment!: EquipmentType
  equipmentColumns = EquipmentColumnsData
  equipmentItems: EquipmentType[] = []
  equipmentOption: MenuOptionType[] = [
    {
      title: "Подробнее",
      title_deleted: "",
      action: (id: number) => this.details(id)
    },
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
  private activatedRoute = inject(ActivatedRoute)
  private contentStateService = inject(ContentStateService)
  content = this.contentStateService.content
  private equipmentService = inject(EquipmentService)
  private snackBarService = inject(SnackBarService)

  ngOnInit() {
    this.activatedRoute.data.subscribe(({equipmentResolver}) => {
      this.equipmentItems = equipmentResolver.equipments.list
      console.log(this.equipmentItems)
    })
  }

  details(id: number) {
    console.log("details", id)
  }

  update(id: number) {
    this.equipmentService.read(id).pipe(take(1)).subscribe({
      next: (data) => {
        this.equipment = data
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
    this.equipmentService.delete(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Оборудование удалено!")
        this.list()
      },
      error: () => {
      }
    })
  }

  restore(id: number) {
    this.equipmentService.restore(id).pipe(take(1)).subscribe({
      next: _ => {
        this.snackBarService.success("Оборудование восстановлено!")
        this.list()
      },
      error: () => {
      }
    })
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
      param: this.equipmentService.param(),
      param_id: this.equipmentService.paramId()
    }

    this.equipmentService.list(qp).subscribe({
      next: (data) => {
        this.equipmentItems = data.list
      },
      error: () => {
      }
    })
  }
}
