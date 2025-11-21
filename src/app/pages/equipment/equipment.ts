import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ListEquipments} from '../../components/list-equipments/list-equipments';

@Component({
  selector: 'app-equipment',
  imports: [
    ListEquipments,
  ],
  templateUrl: './equipment.html',
  styleUrl: './equipment.css'
})

export class Equipment {
  param!: string
  id!: number

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(param => {
      this.param = param.get('param') || ""
      this.id = Number(param.get('id')) || 0
    })
  }
}
