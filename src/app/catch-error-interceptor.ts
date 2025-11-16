import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {SnackBarService} from './services/snack-bar';

export interface ApiErrorResponse {
  message: string
}

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBarService = inject(SnackBarService)

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let msg: string

      if (err.error && typeof err.error === "string") {
        msg = err.error
      } else {
        const apiError = err.error as ApiErrorResponse
        msg = apiError.message || "unknown error"
      }

      console.error(msg)
      snackBarService.error(msg)

      return throwError(() => new Error(msg))
    }),
  )
}
