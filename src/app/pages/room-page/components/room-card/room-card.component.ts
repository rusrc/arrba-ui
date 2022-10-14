import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../../../../models/vehicle';
import { ROOT_HOST } from '../../../../common/constants/constants';
import { VehicleService } from '../../../../common/services/Vehicle/vehicle.service';
import { MessageService } from '../../../../common/services/message/message.service';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html'
})
export class RoomCardComponent implements OnInit {

  @Input() adVehicle: Vehicle;
  mainImg: string;

  constructor(
    private vehicleService: VehicleService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.mainImg = `${ROOT_HOST}/${this.adVehicle.MainImg}`;
  }

  inArchive(event: any) {
    event.preventDefault();

    this.adVehicle.AdStatus = 'Deleted';
    this.vehicleService.edit(this.adVehicle).subscribe(adVehicle => {
      this.adVehicle = adVehicle;
    }, error => {
      this.messageService.throwError(error);
    });
  }

  getExpirationDays() {
    const d1 = new Date(this.adVehicle.AddDate);
    const d2 = new Date(this.adVehicle.DateExpired);
    const timeDiff = Math.abs(d2.getTime() - new Date().getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  }

  isExpired() {
    const expired = new Date(this.adVehicle.DateExpired).getTime();
    const now = new Date().getTime();

    return now > expired;
  }
}
