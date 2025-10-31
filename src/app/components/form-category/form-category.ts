import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {CategoryService, CategoryType} from '../../services/category';
import {ContentStateService, State, StateDefault} from '../../services/content-state';

@Component({
  selector: 'app-form-category',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './form-category.html',
  styleUrl: './form-category.css'
})

export class FormCategory implements OnInit {
  @Input() category!: CategoryType
  head = "Создание"
  form: FormGroup
  title = new FormControl("", [
    Validators.required,
    Validators.pattern("[0-9а-яА-Яa-zA-Z ]+"),
    Validators.minLength(3),
    Validators.maxLength(50)]);

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private contentStateService: ContentStateService) {
    this.form = this.formBuilder.group({
      title: this.title,
    })
  }

  ngOnInit() {
    if (this.contentStateService.content() === State.Update) {
      this.head = "Изменение"
      this.form.setValue({
        title: this.category.title
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
        this.categoryService.create(this.form.value)
        this.cancel()
        break
      case State.Update:
        this.categoryService.update(this.form.value)
        this.cancel()
        break
    }
  }

  cancel() {
    this.contentStateService.toggleContent(StateDefault)
  }
}
