import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {CategoryType} from '../../services/category';
import {ProfileService} from '../../services/profile';

@Component({
  selector: 'app-form-profile',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form-profile.html',
  styleUrl: './form-profile.css'
})

export class FormProfile {
  categoryItems: CategoryType[] = []
  form: FormGroup
  title = new FormControl("", [
    Validators.required,
    Validators.pattern("[0-9а-яА-Яa-zA-Z ]+"),
    Validators.minLength(3),
    Validators.maxLength(50)])
  category = new FormControl("", Validators.required)

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService) {
    this.form = this.formBuilder.group({
      title: this.title,
      category: this.category
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

    this.profileService.create(this.form.value)
  }
}
