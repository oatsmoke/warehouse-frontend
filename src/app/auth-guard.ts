import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const user = authService.getUser()
  const minRole = route.data['minRole'] as number

  return user !== null && user.role <= minRole
}
