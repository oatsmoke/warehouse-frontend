import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {UserService, UserType} from '../../services/user';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {SnackBarService} from '../../services/snack-bar';
import {QueryParams} from '../../services/list';
import {take} from 'rxjs';
import {EmployeeService, EmployeeType} from '../../services/employee';
import {MatSelectModule} from '@angular/material/select';
import {RoleService, RoleType} from '../../services/role';

@Component({
  selector: 'app-form-user',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form-user.html',
  styleUrl: './form-user.css'
})

export class FormUser implements OnInit {
  @Input() user!: UserType
  @Output() relist = new EventEmitter<void>()
  head = "Создание"
  employeeItems: EmployeeType[] = []
  roleItems: RoleType[] = []
  form: FormGroup
  username = new FormControl("", [
    Validators.required,
    Validators.pattern(/^[A-Za-z]+$/),
    Validators.minLength(3),
    Validators.maxLength(20)])
  email = new FormControl("", [
    Validators.required,
    Validators.email])
  role = new FormControl("", [Validators.required])
  employee = new FormControl(0, [])

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private employeeService: EmployeeService,
    private roleService: RoleService,
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

    this.roleService.list().pipe(take(1)).subscribe({
      next: (data) => {
        this.roleItems = data
      },
      error: () => {
      }
    })

    this.employeeService.list(qp).pipe(take(1)).subscribe({
      next: (data) => {
        this.employeeItems = data.list
      },
      error: () => {
      }
    })

    this.form = this.formBuilder.group({
      id: 0,
      username: this.username,
      email: this.email,
      role: this.role,
      employee_id: this.employee
    })
  }

  ngOnInit() {
    if (this.contentStateService.content() === State.Update) {
      this.head = "Изменение"
      this.form.setValue({
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
        role: this.user.role,
        employee_id: this.user.employee.id || 0
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
        this.userService.create(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Пользователь добавлен!")
            this.relist.emit()
            this.cancel()
          },
          error: () => {
          }
        })
        break
      case State.Update:
        this.userService.update(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Пользователь обновлен!")
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
