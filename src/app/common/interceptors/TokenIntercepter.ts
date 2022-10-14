import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthorizationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token =
            this.auth.isAuthorized ? this.auth.token :
                this.auth.isGuest ? this.auth.guestToken : '';

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(request);
    }
}
