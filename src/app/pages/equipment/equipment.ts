import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ListEquipments} from '../../components/list-equipments/list-equipments';
import {EquipmentService} from '../../services/equipment';

@Component({
  selector: 'app-equipment',
  imports: [
    ListEquipments,
  ],
  templateUrl: './equipment.html',
  styleUrl: './equipment.css'
})

export class Equipment {
  constructor(
    private equipmentService: EquipmentService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(param => {
      this.equipmentService.param.set(param.get('param') || "")
      this.equipmentService.paramId.set(Number(param.get('id')) || 0)
    })
  }
}
