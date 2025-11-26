import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {CategoryService, CategoryType} from '../../services/category';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {take} from 'rxjs';
import {SnackBarService} from '../../services/snack-bar';

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
  @Output() relist = new EventEmitter<void>()
  head = "Создание"
  form: FormGroup
  title = new FormControl("", [
    Validators.required,
    Validators.pattern(/^[A-Za-zА-Яа-яЁё0-9 -]+$/),
    Validators.minLength(3),
    Validators.maxLength(50)])

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
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
        id: this.category.id,
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
        this.categoryService.create(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Категория добавлена!")
            this.relist.emit()
            this.cancel()
          },
          error: () => {
          }
        })
        break
      case State.Update:
        this.categoryService.update(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Категория обновлена!")
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
