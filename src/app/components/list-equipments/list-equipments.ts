import {Component, signal} from '@angular/core';
import {FormConfirm} from "../form-confirm/form-confirm";
import {FormEmpty} from "../form-empty/form-empty";
import {Table} from "../table/table";
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {FormEquipment} from '../form-equipment/form-equipment';
import {MenuOptionType} from '../menu-option/menu-option';
import {EquipmentColumnsData, EquipmentService, EquipmentType} from '../../services/equipment';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';
import {QueryParams} from '../../services/list';

@Component({
  selector: 'app-list-equipments',
  imports: [
    FormConfirm,
    FormEmpty,
    Table,
    FormEquipment
  ],
  templateUrl: './list-equipments.html',
  styleUrl: './list-equipments.css'
})

export class ListEquipments {
  content = signal(StateDefault)
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

  constructor(
    private equipmentService: EquipmentService,
    private contentStateService: ContentStateService,
    private snackBarService: SnackBarService
  ) {
    this.content = this.contentStateService.content
    this.list()
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
      WithDeleted: "false",
      Search: "",
      Ids: [],
      SortColumn: "",
      SortOrder: "",
      PaginationLimit: 0,
      PaginationOffset: 0,
    }

    this.equipmentService.list(qp).pipe(take(1)).subscribe({
      next: (data) => {
        this.equipmentItems = data.list
      },
      error: () => {
      }
    })
  }
}
