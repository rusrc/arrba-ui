import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-map',
  templateUrl: './card-map.component.html',
  styles: []
})
export class CardMapComponent implements OnInit {

  @Input() lat: number;
  @Input() lng: number;

  constructor() { }

  ngOnInit() {
  }

  mapClick(data: { coords: { lat: number, lng: number } }) {
    console.log(data);
    const { coords } = data;
    this.lat = coords.lat;
    this.lng = coords.lng;
  }

}
