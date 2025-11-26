import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {DepartmentService, DepartmentType} from '../../services/department';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';

@Component({
  selector: 'app-form-department',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './form-department.html',
  styleUrl: './form-department.css'
})

export class FormDepartment implements OnInit {
  @Input() department!: DepartmentType
  @Output() relist = new EventEmitter<void>()
  head = "Создание"
  form: FormGroup
  title = new FormControl("", [
    Validators.required,
    Validators.pattern(/^[0-9A-Za-zА-Яа-яЁё -]+$/),
    Validators.minLength(3),
    Validators.maxLength(50)])

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private contentStateService: ContentStateService,
    private snackBarService: SnackBarService
  ) {
    this.form = this.formBuilder.group({
      id: 0,
      title: this.title
    })
  }

  ngOnInit() {
    if (this.contentStateService.content() === State.Update) {
      this.head = "Изменение"
      this.form.setValue({
        id: this.department.id,
        title: this.department.title
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
        this.departmentService.create(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Отдел добавлен!")
            this.relist.emit()
            this.cancel()
          },
          error: () => {
          }
        })
        break
      case State.Update:
        this.departmentService.update(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Отдел обновлен!")
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
