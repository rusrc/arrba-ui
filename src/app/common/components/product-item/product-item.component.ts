import { Component, Input } from '@angular/core';
import { Vehicle } from '../../../models/vehicle';
import { VehicleService } from '../../services/Vehicle/vehicle.service';
import { ROOT_HOST } from '../../constants/constants';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent {

  @Input() productItem: Vehicle;
  @Input() index: number;
  host =  ROOT_HOST || 'https://arrba-api.azurewebsites.net';

  constructor(private vehicleService: VehicleService) { }

  inShort(description: string, comment?: string) {
    const str = (description || '') + ' ' + (comment || '');
    const len = 100;
    if (str && str.length > len) {
      return str.substring(0, len) + '...';
    }
    return str;
  }

  getUrlToItem() {
    const correctItemName = this.vehicleService.generateItemName(this.productItem);
    return ['/', 'cities', this.productItem.CityAlias || '', 'categories', this.productItem.CategAlias || '', correctItemName, 'item'];
  }
}
