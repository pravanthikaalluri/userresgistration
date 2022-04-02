import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { ApiService } from '../services/api.service';
@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: ApiService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    var isAuthenticated = this.authService.getAuthenticationStatus();
    if (!isAuthenticated) {
      this.router.navigate(['/registration']);
    }
    return isAuthenticated;
  }
}
