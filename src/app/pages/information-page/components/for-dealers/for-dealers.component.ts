import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-for-dealers',
  templateUrl: './for-dealers.component.html',
  styles: []
})
export class ForDealersComponent implements OnInit {

  basePrice = 3000;

  constructor() { }

  ngOnInit() {
  }

  get monthPrice() {
    return this.getPricePerMonth(1);
  }

  get sixMonthPrice() {
    return this.getPricePerMonth(6);
  }

  get yearPrice() {
    return this.getPricePerMonth(12);
  }

  getPricePerMonth(monthes: number) {
    if (monthes === 1) {
      return this.basePrice;
    }
    if (monthes === 6) {
      return this.basePrice * 0.85; // 15%
    }
    if (monthes === 12) {
      return this.basePrice * 0.75; // 25%
    }
  }

}
