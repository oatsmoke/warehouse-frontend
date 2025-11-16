import {Component} from '@angular/core';
import {Table, TableColumnsType} from '../../components/table/table';
import {ActivatedRoute} from '@angular/router';
import {EquipmentColumnsData, EquipmentData, EquipmentService, EquipmentType} from '../../services/equipment';
import {MenuOptionType} from '../../components/menu-option/menu-option';

@Component({
  selector: 'app-equipment',
  imports: [
    Table,
  ],
  templateUrl: './equipment.html',
  styleUrl: './equipment.css'
})

export class Equipment {
  param!: string
  id!: number

  equipmentColumns: TableColumnsType[] = EquipmentColumnsData
  equipmentItems: EquipmentType[] = EquipmentData
  equipmentOption: MenuOptionType[] = [
    {
      title: "Подробнее",
      title_deleted:"",
      action: (id: number) => this.equipmentService.details(id)
    },
    {
      title: "Изменить",
      title_deleted:"",
      action: (id: number) => this.equipmentService.update(id)
    },
    {
      title: "Удалить",
      title_deleted:"",
      action: (id: number) => this.equipmentService.delete(id)
    }
  ]

  constructor(private route: ActivatedRoute,
              private equipmentService: EquipmentService) {
    this.route.paramMap.subscribe(param => {
      this.param = param.get('param') || ""
      this.id = Number(param.get('id')) || 0
    })
  }
}
