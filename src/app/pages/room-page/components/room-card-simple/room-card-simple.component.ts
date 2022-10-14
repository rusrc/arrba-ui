import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from '../../../../models/vehicle';

@Component({
  selector: 'app-room-card-simple',
  templateUrl: './room-card-simple.component.html',
  styles: []
})
export class RoomCardSimpleComponent implements OnInit {

  @Input() item: Vehicle;

  constructor() { }

  ngOnInit() {
  }

}
