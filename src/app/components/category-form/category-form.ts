import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule, MatLabel} from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AdministrationCategoryService} from '../../services/administration-category';

@Component({
  selector: 'app-category-form',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})

export class CategoryForm {
  form: FormGroup
  title = new FormControl("", [
    Validators.required,
    Validators.pattern("[0-9а-яА-Яa-zA-Z ]+"),
    Validators.minLength(3),
    Validators.maxLength(20)]);

  constructor(private formBuilder: FormBuilder, private administrationCategoryService: AdministrationCategoryService) {
    this.form = this.formBuilder.group({
      title: this.title,
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.administrationCategoryService.create(this.form.value)
  }
}
