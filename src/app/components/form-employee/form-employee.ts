import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {EmployeeService, EmployeeType} from '../../services/employee';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';

@Component({
  selector: 'app-form-employee',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './form-employee.html',
  styleUrl: './form-employee.css'
})

export class FormEmployee implements OnInit {
  @Input() employee!: EmployeeType
  @Output() relist = new EventEmitter<void>()
  head = "Создание"
  form: FormGroup
  last_name = new FormControl("", [
    Validators.required,
    Validators.pattern(/^[А-Яа-яЁё]+$/),
    Validators.minLength(3),
    Validators.maxLength(50)])
  first_name = new FormControl("", [
    Validators.required,
    Validators.pattern(/^[А-Яа-яЁё]+$/),
    Validators.minLength(3),
    Validators.maxLength(50)])
  middle_name = new FormControl("", [
    Validators.pattern(/^[А-Яа-яЁё]+$/),
    Validators.minLength(3),
    Validators.maxLength(50)])
  phone = new FormControl("", [
    Validators.required,
    Validators.pattern(/^(\+7|8)\d{10}$/)])

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private contentStateService: ContentStateService,
    private snackBarService: SnackBarService
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      last_name: this.last_name,
      first_name: this.first_name,
      middle_name: this.middle_name,
      phone: this.phone
    })
  }

  ngOnInit() {
    if (this.contentStateService.content() === State.Update) {
      this.head = "Изменение"
      this.form.setValue({
        id: this.employee.id,
        last_name: this.employee.last_name,
        first_name: this.employee.first_name,
        middle_name: this.employee.middle_name,
        phone: this.employee.phone
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
        this.employeeService.create(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Сотрудник добавлен!")
            this.relist.emit()
            this.cancel()
          },
          error: () => {
          }
        })
        break
      case State.Update:
        this.employeeService.update(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Сотрудник обновлен!")
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
