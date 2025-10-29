import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {CompanyService} from '../../services/company';
import {DepartmentService} from '../../services/department';

@Component({
  selector: 'app-department-form',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './department-form.html',
  styleUrl: './department-form.css'
})

export class DepartmentForm {
  form: FormGroup
  title = new FormControl("", [
    Validators.required,
    Validators.pattern("[0-9а-яА-Яa-zA-Z ]+"),
    Validators.minLength(3),
    Validators.maxLength(50)]);

  constructor(private formBuilder: FormBuilder, private departmentService: DepartmentService) {
    this.form = this.formBuilder.group({
      title: this.title,
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.departmentService.create(this.form.value)
  }
}
