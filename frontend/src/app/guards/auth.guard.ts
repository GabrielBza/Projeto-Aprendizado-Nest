import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');

  if (authService.tokenValido()) {
    return true;
  }

  localStorage.removeItem('token');

  return router.createUrlTree(['/login']);
};
