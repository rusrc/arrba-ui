import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo/seo.service';
import { City } from '../../../models/city';
import { CityService } from '../../services/city/city.service';
import { LettererService } from '../../services/letterer/letterer.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';

const FOOTER_CITIES = makeStateKey('FOOTER_CITIES');

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  description: string;
  cities: City[];
  constructor(
    private seoService: SeoService,
    private cityService: CityService,
    private letterService: LettererService,
    private transferState: TransferState
  ) { }

  get currentYear() {
    return new Date().getFullYear();
  }

  ngOnInit() {
    this.description = this.seoService.getFooterDescription();

    const _cities = this.transferState.get(FOOTER_CITIES, null as City[]);
    if (_cities) {
      this.cities = _cities;
    } else {
      this.cityService.getOrderedByWeight(24, true).subscribe(cities => {
        this.cities = cities;
        this.transferState.set(FOOTER_CITIES, cities);
      });
    }
  }

  getMatrix(cities: City[]) {
    return this.letterService.formMatrixSimple(cities, 4, false);
  }
}
