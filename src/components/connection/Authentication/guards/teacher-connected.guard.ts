import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { inject, Inject } from '@angular/core';

export const teacherConnectedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = Inject(Router);
  if (authService.isLoggedIn && authService.isTeacher == true)
    return true;
  else
  {
    router.navigate(['login']);
    return false;
    
  }
};
