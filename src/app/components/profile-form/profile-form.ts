import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProfileService} from '../../services/profile';
import {MatSelectModule} from '@angular/material/select';
import {CategoryData} from '../../services/category';

@Component({
  selector: 'app-profile-form',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css'
})
export class ProfileForm {
  categoryItems = CategoryData
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
