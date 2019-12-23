import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router,CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements  CanActivate{
  constructor( public Auth:AuthService,private router: Router){}
  canActivate(route, state: RouterStateSnapshot) {
    return this.Auth.userObs.pipe(map(user => {
      if (user) return true; 

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }));
  }
}
