import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../services/authorization/authorization.service';


@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {

    constructor(
        private authService: AuthorizationService,
        private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthorized && this.authService.isTokenExpired) {
            this.authService.deleteToken();
        }
        if (this.authService.isGuest && this.authService.guestTokenExpired) {
            this.authService.deleteGuestToket();
        }
        // If user undefind let's him to be guest or register
        if (!this.authService.isGuest && !this.authService.isAuthorized) {
            const categoryId = next.params['categoryId'];
            this.router.navigate(['add-new-item', 'checkguest', { categoryId: categoryId }]);
        }
        return this.authService.isGuest || this.authService.isAuthorized;
    }
}
