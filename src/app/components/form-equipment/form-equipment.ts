import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ProfileService, ProfileType} from '../../services/profile';
import {EquipmentService, EquipmentType} from '../../services/equipment';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {SnackBarService} from '../../services/snack-bar';
import {QueryParams} from '../../services/list';
import {take} from 'rxjs';

@Component({
  selector: 'app-form-equipment',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form-equipment.html',
  styleUrl: './form-equipment.css'
})

export class FormEquipment implements OnInit {
  @Input() equipment!: EquipmentType
  @Output() relist = new EventEmitter<void>()
  head = "Создание"
  profileItems: ProfileType[] = []
  form: FormGroup
  serial_number = new FormControl("", [
    Validators.required,
    Validators.pattern(/^[0-9A-Za-z]+$/),
    Validators.minLength(3),
    Validators.maxLength(50)])
  profile = new FormControl("", Validators.required)

  constructor(
    private formBuilder: FormBuilder,
    private equipmentService: EquipmentService,
    private profileService: ProfileService,
    private contentStateService: ContentStateService,
    private snackBarService: SnackBarService
  ) {
    const qp: QueryParams = {
      WithDeleted: "false",
      Search: "",
      Ids: [],
      SortColumn: "title",
      SortOrder: "",
      PaginationLimit: 0,
      PaginationOffset: 0,
    }

    this.profileService.list(qp).pipe(take(1)).subscribe({
      next: (data) => {
        this.profileItems = data.list
      },
      error: () => {
      }
    })

    this.form = this.formBuilder.group({
      id: 0,
      serial_number: this.serial_number,
      profile_id: this.profile
    })
  }

  ngOnInit() {
    if (this.contentStateService.content() === State.Update) {
      this.head = "Изменение"
      this.form.setValue({
        id: this.equipment.id,
        serial_number: this.equipment.serial_number,
        profile_id: this.equipment.profile.id
      })
    }
  }

  ok() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    switch (this.contentStateService.content()) {
      case State.Create:
        this.equipmentService.create(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            console.log(this.form.value)
            this.snackBarService.success("Оборудование добавлено!")
            this.relist.emit()
            this.cancel()
          },
          error: () => {
          }
        })
        break
      case State.Update:
        this.equipmentService.update(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Оборудование обновлено!")
            this.relist.emit()
            this.cancel()
          },
          error: () => {
          }
        })
        break
    }
  }

  cancel() {
    this.contentStateService.toggleContent(StateDefault)
  }
}
