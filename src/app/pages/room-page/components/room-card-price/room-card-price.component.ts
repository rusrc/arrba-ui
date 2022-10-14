import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../../../../models/vehicle';
import { VehicleService } from '../../../../common/services/Vehicle/vehicle.service';

@Component({
  selector: 'app-room-card-price',
  templateUrl: './room-card-price.component.html',
  styles: []
})
export class RoomCardPriceComponent implements OnInit {

  public isEditable = false;
  @Input() adVehicle: Vehicle;
  valueStapshop;

  constructor(private adVehicleService: VehicleService) { }

  ngOnInit() {
    this.valueStapshop = this.adVehicle.Price;
  }

  onChange(value: any) {
    this.valueStapshop = value;
  }

  onClickOutside($event) {
    this.isEditable = false;
    if (this.valueStapshop !== this.adVehicle.Price) {

      const copy = Object.assign({}, this.adVehicle);
      copy.Price = this.valueStapshop;

      this.adVehicleService.edit(copy).subscribe(adVehicle => {
        this.adVehicle = adVehicle;
      }, error => {
        console.error(error);
      });
    }
  }

  makeEditable() {
    this.isEditable = true;
  }

}
