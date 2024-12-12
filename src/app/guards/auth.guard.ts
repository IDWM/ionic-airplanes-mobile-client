import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthInitialized() || !authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
