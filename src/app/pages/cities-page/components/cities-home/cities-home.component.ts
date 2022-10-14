import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../../common/services/city/city.service';
import { DEFAULT_COUNTRY_ID, DEFAULT_COUNTRY_NAME_GENITIVE } from '../../../../common/constants/constants';
import { LettererService } from '../../../../common/services/letterer/letterer.service';
import { City } from '../../../../models/city';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from '../../../../common/services/seo/seo.service';

@Component({
  selector: 'app-cities-home',
  templateUrl: './cities-home.component.html',
  styles: []
})
export class CitiesHomeComponent implements OnInit {

  // letters: string[];
  breadcrumbRoutes: any[];
  cityMatrix: City[][];
  titleTag: string;

  constructor(
    private router: Router,
    private cityService: CityService,
    private letterService: LettererService,
    private title: Title,
    private seoService: SeoService) { }

  ngOnInit() {
    this.breadcrumbRoutes = [
      { key: 'главная', value: '/' },
      { key: 'города', value: ['/'] }
    ];

    this.cityService.getAll(DEFAULT_COUNTRY_ID, true)
      .subscribe(cities => {
        this.cityMatrix = <City[][]>this.letterService.formMatrixSimple(cities, 4);
      });

    this.seo({});
  }

  cityOnSelected($event, city) {
    event.preventDefault();

    // TODO set city to localStorage or no
    this.cityService.cityInLocalStorage = city;
    const url = city ? ['cities', city.Alias] : ['/'];
    this.router.navigate(url);
  }

  seo(model: any) {
    this.seoService.cityHomePage();
    this.titleTag = this.title.getTitle();
  }

}
