import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../services/city/city.service';


@Injectable()
export class CityInterceptor implements HttpInterceptor {

    constructor(public route: ActivatedRoute,
        private cityService: CityService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const wpJsonRequest = request.url && /wp-json/ig.test(request.url);
        if (wpJsonRequest) {
            return next.handle(request);
        }

        if (this.cityService.cityInLocalStorage) {
            const cityId = this.cityService.cityInLocalStorage.ID;
            request = request.clone({
                setHeaders: {
                    CityId: cityId.toString()
                }
            });
        }

        return next.handle(request);
    }
}
