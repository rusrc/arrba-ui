import { Component, OnInit, Input } from '@angular/core';
import { SuperCategsAndCategsWithBrand } from '../../models/SuperCategsAndCategsWithBrand';
import { ROOT_HOST } from '../../../../common/constants/constants';

const COLUMNS_COUNT = 3;
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  @Input() item: SuperCategsAndCategsWithBrand;
  columnsCount: number = (COLUMNS_COUNT - 1) * 2;
  host = ROOT_HOST;

  constructor() { }

  ngOnInit() {
  }

  getH2(item: SuperCategsAndCategsWithBrand) {
    return item.CityName ? `${item.SuperCategoryName} в г. ${item.CityName}` : item.SuperCategoryName;
  }
}
