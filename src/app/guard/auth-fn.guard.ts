import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService} from "../services/auth.service";

export const authGuardFn: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    return authService.checkUserLogin(route);

}