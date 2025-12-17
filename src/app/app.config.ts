import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {catchErrorInterceptor} from './catch-error-interceptor';
import {AuthService} from './services/auth';
import {take} from 'rxjs';
import {UserType} from './services/user';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptors([catchErrorInterceptor])),
    provideAppInitializer(() => {
      const authService = inject(AuthService)
      authService.getUserFromApi().pipe(take(1)).subscribe({
        next: (user: UserType) => {
          authService.setUser(user)
        },
        error: () => {
        }
      })
    })
  ]
}
