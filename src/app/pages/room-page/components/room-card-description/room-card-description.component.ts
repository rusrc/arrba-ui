import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../../../../models/vehicle';
import { showHideAnimation } from '../../../../common/animations/showHide';
import { VehicleService } from '../../../../common/services/Vehicle/vehicle.service';
import { MessageService } from '../../../../common/services/message/message.service';

@Component({
  selector: 'app-room-card-description',
  templateUrl: './room-card-description.component.html',
  animations: [
    showHideAnimation('showHideState', 300)
  ]
})
export class RoomCardDescriptionComponent implements OnInit {
  public showState = 'inactive';
  public isEditable = false;
  @Input() adVehicle: Vehicle;

  private valueStapshop: string;

  constructor(
    private adVehicleService: VehicleService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    // Initial previousDescription
    this.valueStapshop = this.adVehicle.Description;
  }

  onChange(description: string) {
    this.valueStapshop = description;
  }

  onClickOutside($event) {
    this.isEditable = false;
    if (this.valueStapshop !== this.adVehicle.Description) {
      const copy = Object.assign({}, this.adVehicle);
      copy.Description = this.valueStapshop;
      this.adVehicleService.edit(copy).subscribe(adVehicle => {
        this.adVehicle = adVehicle;
      }, error => {
        this.messageService.throwError(error);
      });
    }
  }

  makeEditable() {
    this.isEditable = true;
  }

  toggleShowHide(event) {
    event.preventDefault();
    this.showState = this.showState === 'active' ? 'inactive' : 'active';
  }

}
