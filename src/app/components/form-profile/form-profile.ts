import {Component, Input, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {CategoryService, CategoryType} from '../../services/category';
import {ProfileService, ProfileType} from '../../services/profile';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';

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

export class FormProfile implements OnInit {
  @Input() profile!: ProfileType
  head = "Создание"
  categoryItems: CategoryType[] = []
  form: FormGroup
  title = new FormControl("", [
    Validators.required,
    Validators.pattern("[0-9а-яА-Яa-zA-Z ]+"),
    Validators.minLength(3),
    Validators.maxLength(50)])
  category = new FormControl("", Validators.required)

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private categoryService: CategoryService,
    private contentStateService: ContentStateService,
    private snackBarService: SnackBarService
  ) {
    this.categoryService.list().pipe(take(1)).subscribe({
      next: (data) => {
        this.categoryItems = data.list
      },
      error: () => {
      }
    })

    this.form = this.formBuilder.group({
      id: 0,
      title: this.title,
      category: this.category
    })
  }

  ngOnInit() {
    if (this.contentStateService.content() === State.Update) {
      this.head = "Изменение"
      this.form.setValue({
        id: this.profile.id,
        title: this.profile.title,
        category: this.profile.category.id
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
        this.profileService.create(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Профиль добавлен!")
            this.cancel()
          },
          error: () => {
          }
        })
        break
      case State.Update:
        this.profileService.update(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Профиль обновлен!")
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
