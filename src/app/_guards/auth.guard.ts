import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonaService } from '../services/persona.service';
@Injectable()
export class AuthGuard implements CanActivate {

    rol:string;
    constructor(private router: Router, private PersonaS: PersonaService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger;
        if (sessionStorage.getItem('cliente')) {
            // logged in so return true
            
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}