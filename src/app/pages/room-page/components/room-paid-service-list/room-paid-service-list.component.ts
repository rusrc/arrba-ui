import { Component, OnInit } from '@angular/core';
import { showHideAnimation } from '../../../../common/animations/showHide';

@Component({
  selector: 'app-room-paid-service-list',
  templateUrl: './room-paid-service-list.component.html',
  styleUrls: ['./room-paid-service-list.component.css'],
  animations: [
    showHideAnimation('showHideState', 300)
  ]
})
export class RoomPaidServiceListComponent implements OnInit {

  public showState = 'inactive';

  constructor() { }

  ngOnInit() {
  }

  toggle(event) {
    event.preventDefault();
    this.showState = this.showState === 'active' ? 'inactive' : 'active';
  }

}
