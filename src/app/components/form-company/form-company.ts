import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompanyService, CompanyType} from '../../services/company';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ContentStateService, State, StateDefault} from '../../services/content-state';

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
    private contentStateService: ContentStateService) {
    this.form = this.formBuilder.group({
      title: this.title,
    })
  }

  ngOnInit() {
    if (this.contentStateService.content() === State.Update) {
      this.head = "Изменение"
      this.form.setValue({
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
        this.companyService.create(this.form.value)
        this.cancel()
        break
      case State.Update:
        this.companyService.update(this.form.value)
        this.cancel()
        break
    }
  }

  cancel() {
    this.contentStateService.toggleContent(StateDefault)
  }
}
