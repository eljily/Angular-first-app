import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);
  let authenticated = authService.isAuthenticated();
  if (authenticated) {
    return true;
  } else {
    router.navigateByUrl("/login");
    return false;
  }
};
