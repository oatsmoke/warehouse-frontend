import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompanyService, CompanyType} from '../../services/company';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ContentStateService, State, StateDefault} from '../../services/content-state';
import {SnackBarService} from '../../services/snack-bar';
import {take} from 'rxjs';

@Component({
  selector: 'app-form-company',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './form-company.html',
  styleUrl: './form-company.css'
})

export class FormCompany implements OnInit {
  @Input() company!: CompanyType
  @Output() relist = new EventEmitter<void>()
  head = "Создание"
  form: FormGroup
  title = new FormControl("", [
    Validators.required,
    Validators.pattern("[0-9а-яА-Яa-zA-Z ]+"),
    Validators.minLength(3),
    Validators.maxLength(50)]);

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
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
        id: this.company.id,
        title: this.company.title
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
        this.companyService.create(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Компания добавлена!")
            this.relist.emit()
            this.cancel()
          },
          error: () => {
          }
        })
        break
      case State.Update:
        this.companyService.update(this.form.value).pipe(take(1)).subscribe({
          next: () => {
            this.snackBarService.success("Компания обновлена!")
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
