import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Dealership } from '../../../../models/dealership';
import { DealershipService } from '../../../../common/services/dealership/dealership.service';
import { VehicleService } from '../../../../common/services/Vehicle/vehicle.service';
import { Vehicle } from '../../../../models/vehicle';
import { PagedList } from '../../../../common/components/pagination/models/pagedList';
import { SeoService } from '../../../../common/services/seo/seo.service';
import { ISeo } from '../../../../common/interfaces/ISeo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit, ISeo {

  breadcrumbRoutes: Array<{ key: string, value: any }> = [];
  dealership$: Observable<Dealership>;
  vehicles: Vehicle[];
  page: PagedList<Vehicle>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dealershipService: DealershipService,
    private vehicleService: VehicleService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams)
      .subscribe(data => {
        const [params, queryParams] = data;
        const id = +params['id'];
        const pageNumber = queryParams['pageNumber'];
        const sorter = queryParams['sorter'];
        const currencyId = queryParams['currencyId'];

        this.dealership$ = this.dealershipService.get(id);
        this.vehicleService.getByDelearshipId(id, currencyId, sorter, pageNumber)
          .subscribe(pagedItems => {
            this.page = pagedItems;
            this.vehicles = pagedItems.Items;
          });
      });

    this.dealership$.subscribe(dealership => {
      this.breadcrumbs(dealership);
      this.seo(dealership);
    });
  }

  breadcrumbs(dealership: Dealership) {
    this.breadcrumbRoutes.push({ key: 'главная', value: ['/'] });
    this.breadcrumbRoutes.push({ key: 'дилеры', value: ['/', 'dealers'] });
    this.breadcrumbRoutes.push({ key: dealership.Name, value: ['/'] });
  }

  seo(dealer: Dealership) {
    this.seoService.productItemLIstDealerPage(dealer);
  }

}
