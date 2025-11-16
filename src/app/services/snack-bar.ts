import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class SnackBarService {
  private snackBar = inject(MatSnackBar)

  success(msg: string) {
    this.snackBar.open(msg, "Закрыть", {duration: 5000, panelClass: "success-snackbar"})
  }

  error(msg: string) {
    this.snackBar.open(msg, "Закрыть", {duration: 5000, panelClass: 'error-snackbar'})
  }
}
