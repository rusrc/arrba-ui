import { Component, OnInit } from '@angular/core';
import { DealershipService } from '../../../../common/services/dealership/dealership.service';
import { Dealership } from '../../../../../app/models/dealership';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dealer-list',
  templateUrl: './dealer-list.component.html',
  styles: []
})
export class DealerListComponent implements OnInit {

  dealerships$: Observable<Dealership[]>;
  breadcrumbRoutes: Array<{ key: string, value: any }> = [];
  constructor(private dealerService: DealershipService) { }

  ngOnInit() {
    this.dealerships$ = this.dealerService.getAll();
    this.breadcrumbs();
  }

  breadcrumbs() {
    this.breadcrumbRoutes.push({ key: 'главная', value: ['/'] });
    this.breadcrumbRoutes.push({ key: 'дилеры', value: [] });
  }

}
