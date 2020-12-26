import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{

constructor(
  private loginService: LoginService,
  private router: Router
) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.loginService.estaAutenticado())
      {
      if (this.loginService.getUsuario().role === 'ADMIN_ROLE') {
          return true;
        } else {
        this.router.navigateByUrl('/login');
          return false;
        }
      }else this.router.navigateByUrl('/login');

  }


}
