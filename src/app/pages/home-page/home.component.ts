import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { PagedList } from '../../common/components/pagination/models/pagedList';
import { SeoService } from '../../common/services/seo/seo.service';
import { ROOT_HOST } from '../../common/constants/constants';
import { Vehicle } from '../../../app/models/vehicle';
import { Router, ActivatedRoute } from '@angular/router';
import { CityService } from '../../common/services/city/city.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ISeo } from '../../common/interfaces/ISeo';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, ISeo {

    cityName: string;
    productItems: any[];
    page: PagedList<Vehicle>;
    paginationRouteValue: any[];
    images;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private seoService: SeoService,
        private cityService: CityService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activeRoute.params
            .pipe(
                tap(params => {
                    const cityAlias = params['city'];

                    // redirect to city if (exists in local) and (no in params)
                    if (this.cityService.cityInLocalStorage && !cityAlias) {
                        this.router.navigate(['/', 'cities', this.cityService.cityInLocalStorage.Alias]);
                    }
                }),
                switchMap(params => {
                    const cityAlias = params['city'];
                    if (isPlatformServer(this.platformId) && cityAlias) {
                        return this.cityService.get(cityAlias);
                    }
                    if (isPlatformBrowser(this.platformId) && cityAlias) {
                        return of(this.cityService.cityInLocalStorage);
                    }
                }))
            .subscribe(city => {
                const cityName = city ? city.Name : '';
                this.seo(cityName);
            });

        this.seo('');
        this.images = [ROOT_HOST + '/banners/img_6867%20(1).jpg'];
    }

    seo(cityName: string) {
        this.seoService.homePage(cityName);
    }
}
