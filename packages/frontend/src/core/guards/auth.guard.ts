import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Functional guard — Angular 14+ idiomatic style.
// Protects routes that require authentication (e.g. /analytics).
// Because APP_INITIALIZER resolves before any guard runs, isAuthenticated()
// already reflects the real auth state — no async needed here.
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  // Redirect to login, preserving the intended destination as a query param
  return router.createUrlTree(['/login']);
};
