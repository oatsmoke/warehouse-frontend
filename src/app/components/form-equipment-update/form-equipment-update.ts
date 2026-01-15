import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {EquipmentService, EquipmentType} from '../../services/equipment';
import {ProfileType} from '../../services/profile';
import {CompanyType} from '../../services/company';
import {ContentStateService, StateDefault} from '../../services/content-state';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form-equipment-update',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './form-equipment-update.html',
  styleUrl: './form-equipment-update.css'
})

export class FormEquipmentUpdate implements OnInit {
  @Input() equipment!: EquipmentType
  @Output() relist = new EventEmitter<void>()
  head = "Изменение"
  profileItems: ProfileType[] = []
  companyItems: CompanyType[] = []
  private formBuilder = inject(FormBuilder)
  form = this.formBuilder.nonNullable.group({
    id: [0],
    company_id: [0, Validators.min(1)],
    profile_id: [0, Validators.min(1)],
    serial_number: ["", [
      Validators.required,
      Validators.pattern(/^[0-9A-Za-z]+$/),
      Validators.minLength(3),
      Validators.maxLength(50)]
    ]
  })
  private activatedRoute = inject(ActivatedRoute)
  private equipmentService = inject(EquipmentService)
  private contentStateService = inject(ContentStateService)
  private snackBarService = inject(SnackBarService)

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe(({equipmentResolver}) => {
      this.companyItems = equipmentResolver.companies.list
      this.profileItems = equipmentResolver.profiles.list
    })

    this.form.setValue({
      id: this.equipment.id,
      company_id: this.equipment.company.id,
      profile_id: this.equipment.profile.id,
      serial_number: this.equipment.serial_number
    })
  }

  ok() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.equipmentService.update(this.form.getRawValue()).pipe(take(1)).subscribe({
      next: () => {
        this.snackBarService.success("Оборудование обновлено!")
        this.relist.emit()
        this.cancel()
      },
      error: () => {
      }
    })
  }

  cancel() {
    this.contentStateService.toggleContent(StateDefault)
  }
}
