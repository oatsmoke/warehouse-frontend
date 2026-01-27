import {ResolveFn} from '@angular/router';
import {QueryParams} from '../services/list';
import {forkJoin} from 'rxjs';
import {inject} from '@angular/core';
import {ProfileList, ProfileService} from '../services/profile';
import {CompanyList, CompanyService} from '../services/company';
import {EquipmentList, EquipmentService} from '../services/equipment';

export const equipmentResolver: ResolveFn<{
  companies: CompanyList
  profiles: ProfileList
  equipments: EquipmentList
}> = (route) => {
  const qp1: QueryParams = {
    with_deleted: "false",
    search: "",
    ids: [],
    sort_column: "title",
    sort_order: "",
    pagination_limit: 0,
    pagination_offset: 0,
    param: "",
    param_id: 0
  }

  // const equipmentService=inject(EquipmentService)
  const param = route.paramMap.get('param')!
  const id = Number(route.paramMap.get('id')!)

  const qp2: QueryParams = {
    with_deleted: "false",
    search: "",
    ids: [],
    sort_column: "",
    sort_order: "",
    pagination_limit: 0,
    pagination_offset: 0,
    param: route.paramMap.get('param')!,
    param_id: Number(route.paramMap.get('id')!)
  }

  return forkJoin({
    companies: inject(CompanyService).list(qp1),
    profiles: inject(ProfileService).list(qp1),
    equipments: inject(EquipmentService).list(qp2),
  })
};
