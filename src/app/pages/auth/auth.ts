import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthService} from '../../services/auth';
import {take} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})

export class Auth {
  form: FormGroup
  username = new FormControl("", [Validators.required])
  password = new FormControl("", [Validators.required])

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      username: this.username,
      password: this.password
    })
  }

  ok() {
    console.log(this.form.value)
    this.authService.login(this.form.value).pipe(take(1)).subscribe({
        next: data => {
          console.log(data)
          this.authService.setUser(data)
          this.router.navigate(["/equipment/department/0"]).then()
        },
        error: () => {
        }
      }
    )
  }
}
