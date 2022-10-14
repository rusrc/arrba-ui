import { Brand } from '../../../models/brand';
import { ItemTypeService } from './../ItemType/item-type.service';
import { BrandService } from './../Brand/brand.service';
import { Injectable } from '@angular/core';
import { PropertyService } from '../property/property.service';
import { from, Observable } from 'rxjs';
import { ItemType } from '../../../models/itemType';
import { Property } from '../../../models/property';
import { City } from '../../../models/city';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(
    private itemTypeService: ItemTypeService,
    private brandService: BrandService,
    private propertyService: PropertyService) { }

  GetByCategoryId(categoryId: number): Observable<[ItemType[], Brand[], Property[], City[]]> {
    const typesPromise = this.itemTypeService.GetAll(categoryId).toPromise();
    const brandPromise = this.brandService.GetAll(categoryId).toPromise();
    const propertyPromise = this.propertyService.GetAll(categoryId).toPromise();
    // TODO realize the getting cities form server
    const cities = Promise.resolve(<City[]>[
      { ID: 641, Name: 'Москва', isActive: false },
      { ID: 569, Name: 'Санкт-Петербург', isActive: false }
    ]);

    return from(Promise.all([typesPromise, brandPromise, propertyPromise, cities]));
  }

}
