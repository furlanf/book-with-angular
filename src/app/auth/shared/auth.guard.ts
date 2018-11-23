import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private url: string;

    constructor(private auth: AuthService,
        private router: Router) { }

    public handleAuthState(): boolean {
        if (this.isLoggedOrRegister()) {
            this.router.navigate(['/rentals']);
            return false;
        }
        return true;
    }

    public handleNotAuthState(): boolean {
        if (this.isLoggedOrRegister()) {

            return true;
        }
        this.router.navigate(['login']);
        return false;
    }

    public isLoggedOrRegister(): boolean {
        if (this.url.includes('login') || this.url.includes('register')) {
            return true;
        }
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.url = state.url;

        if (this.auth.isAuthenticated()) {
            return this.handleAuthState();
        }

        return this.handleNotAuthState();
    }
}
