import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {SnackBarService} from './services/snack-bar';
import {Router} from '@angular/router';

export interface ApiErrorResponse {
  message: string
}

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBarService = inject(SnackBarService)
  const router = inject(Router)

  req = req.clone({
    withCredentials: true
  })

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let msg!: string

      if (err.status === 401) {
        router.navigate(['auth']).then()

      }
        if (err.status === 0) {
          msg = err.message
        } else if (err.error && typeof err.error === "string") {
          msg = err.error
        } else {
          const apiError = err.error as ApiErrorResponse
          msg = apiError.message || "unknown error"
        }


      snackBarService.error(msg)
      return throwError(() => new Error(msg))
    }),
  )
}
