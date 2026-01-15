import {Component, EventEmitter, inject, OnInit, Output, signal} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {EquipmentService} from '../../services/equipment';
import {ProfileType} from '../../services/profile';
import {CompanyType} from '../../services/company';
import {ContentStateService, StateDefault} from '../../services/content-state';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form-equipment-create',
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'ru-RU'}, provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './form-equipment-create.html',
  styleUrl: './form-equipment-create.css'
})

export class FormEquipmentCreate implements OnInit {
  @Output() relist = new EventEmitter<void>()
  serialNumbers = signal<string[]>([])
  head = "Создание"
  profileItems: ProfileType[] = []
  companyItems: CompanyType[] = []
  private formBuilder = inject(FormBuilder)
  private activatedRoute = inject(ActivatedRoute)
  private equipmentService = inject(EquipmentService)
  form = this.formBuilder.nonNullable.group({
    date: [new Date(), Validators.required],
    company_id: [0, Validators.min(1)],
    profile_id: [0, Validators.min(1)],
    serial_numbers: [this.serialNumbers(), Validators.required],
    param: [this.equipmentService.param(), Validators.required],
    param_id: [this.equipmentService.paramId(), Validators.required]
  })
  private contentStateService = inject(ContentStateService)
  private snackBarService = inject(SnackBarService)

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe(({equipmentResolver}) => {
      this.companyItems = equipmentResolver.companies.list
      this.profileItems = equipmentResolver.profiles.list
    })
  }

  addSerialNumber(event: MatChipInputEvent) {
    const sn = (event.value || '').trim()

    if (!sn) {
      this.snackBarService.error("Необходимо заполнить!")
      return
    }

    if (sn.length < 3) {
      this.snackBarService.error("Минимум 3 символа!")
      return
    }

    if (!/^[0-9A-Za-z]+$/.test(sn)) {
      this.snackBarService.error("Недопустимые символы!")
      return
    }

    this.serialNumbers.update(data => [...data, sn])

    event.chipInput!.clear()
  }

  delSerialNumber(sn: string) {
    this.serialNumbers.update(data => {
      const index = data.indexOf(sn)
      if (index < 0) {
        return data
      }

      data.splice(index, 1)
      return [...data]
    })
  }

  ok() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.equipmentService.create(this.form.getRawValue()).pipe(take(1)).subscribe({
      next: () => {
        console.log(this.form.value)
        this.snackBarService.success("Оборудование добавлено!")
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
