import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Vehicle } from '../../../../models/vehicle';
import { VehicleService } from '../../../../common/services/Vehicle/vehicle.service';
import { PhoneService } from '../../../../common/services/phone/phone.service';
import { IUserPhone } from '../../../../models/iUserPhone';
import { SeoService } from '../../../../common/services/seo/seo.service';
import { ISeo } from '../../../../common/interfaces/ISeo';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import * as fromReducer from '../../../../store/reducers';
import { Store, select } from '@ngrx/store';
import { LoadCardItemsAction } from '../../actions/card-item.actions';


@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html'
})
export class CardHomeComponent implements OnInit, ISeo {

  phone: IUserPhone;
  breadcrumbRoutes: Array<{ key: string, value: any }> = [];
  isExpired = false;
  vehicle: Vehicle;
  lat: number;
  lng: number;

  /** Transfer states */
  vehicleTransferState: Vehicle;
  /* Transfer states **/

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private phoneService: PhoneService,
    private seoService: SeoService,
    private store: Store<fromReducer.State>,
  ) { }

  get isPlatfromBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const itemName = params['item-name'];
      const id = this.getId(itemName);
      const cityAlias = params['city'];
      const categoryAlias = params['sub-category'];

      // Redirect if no city
      if (!cityAlias) {
        this.router.navigate(['cities', cityAlias, 'categories', categoryAlias, itemName, 'item']);
      }

      this.store.dispatch(new LoadCardItemsAction(id));
    });

    const getVehicleSelector$ = this.store.pipe(select(fromReducer.getVehicle));
    // const getVehicleFailedSelector$ = this.store.pipe(select(fromReducer.get))

    getVehicleSelector$.pipe(
      filter((vehicle) => !!vehicle))
      .subscribe(vehicle => {
        this.vehicle = vehicle;
        this.seo(vehicle);
        this.breadcrumbs(vehicle);
      });

    if (isPlatformBrowser(this.platformId)) {
      this.lat = 51.678418;
      this.lng = 7.809007;
    }
  }

  showPhoneNumber(data: { 'event': MouseEvent, 'phone': IUserPhone }) {
    // If call on link
    if (data instanceof MouseEvent) {
      return;
    } else {
      const id = this.getId(this.route.snapshot.params['item-name']);
      this.phoneService.get(id).subscribe(phone => this.phone = phone);
    }
  }

  seo(vehicle: Vehicle) {
    this.seoService.cardHomePage(vehicle);
    const jsonLd = {
      '@context': 'http://schema.org',
      '@type': 'Organization', // or Person
      'name': 'Saint-Petersburg cars',
      'logo': 'compony-logo.png',
      'email': 'info@compay.com',
      'telephone': '+7(000)000-00-00',
      'location': {
        '@type': 'Place',
        'address': 'text of address here',
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 'number',
          'longitude': 'number',
          'address': {
            '@type': 'PostalAddress',
            'addressCountry': 'RU',
            'postalCode': '94043',
            'streetAddress': '1600 Amphitheatre Pkwy'
          }
        }
      },
      'makesOffer': {
        '@type': 'Offer',
        'priceSpecification': {
          '@type': 'UnitPriceSpecification',
          'priceCurrency': 'USD',
          'price': '18000'
        },
        'itemOffered': {
          '@type': 'Car',
          'name': '2009 Volkswagen Golf V GTI MY09 Direct-Shift Gearbox',
          'description': '2009 Volkswagen Gol',
          'image': '2009_Volkswagen_Golf_V_GTI_MY09.png',
          'color': 'Black',
          'numberOfForwardGears': '6',
          'vehicleEngine': {
            '@type': 'EngineSpecification',
            'name': '4 cylinder Petrol Turbo Intercooled 2.0 L (1984 cc)'
          },
          'brand': {
            '@type': 'Brand',
            'name': 'BMW',
            'image': 'url/brand/bmw.png'
          },
          'numberOfAirbags': '6'
        }
      }
    };
  }

  breadcrumbs(vehicle: Vehicle) {
    this.breadcrumbRoutes = [];
    this.breadcrumbRoutes.push({ key: 'главная', value: '/' });
    this.breadcrumbRoutes.push({ key: vehicle.CategName, value: ['/', 'categories', vehicle.CategAlias] });
    this.breadcrumbRoutes.push({ key: vehicle.BrandName, value: ['/', 'categories', vehicle.CategAlias, vehicle.BrandName] });
    this.breadcrumbRoutes.push({ key: vehicle.Title, value: '/' });
  }

  // TODO delete later if no need anymore
  private itemNameIsCorrect(itemNameFromUrl: string, vehicle: Vehicle) {
    const itemNameFromDb = this.vehicleService.generateItemName(vehicle);
    return itemNameFromUrl === itemNameFromDb;
  }

  private getId(itemName: string) {

    const reg = /\-(\d+)$/gmi;
    const matches = <any>reg.exec(itemName);

    if (matches && matches[1]) {
      return +matches[1];
    }

    return undefined;
  }
}
