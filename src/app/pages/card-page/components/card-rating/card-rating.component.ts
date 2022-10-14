import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-rating',
  templateUrl: './card-rating.component.html',
  styleUrls: [
    './card-rating.component.css'
  ]
})
export class CardRatingComponent implements OnInit {

  checked: number;
  numbers: number[] = [5, 4, 3, 2, 1];

  constructor() { }

  ngOnInit() {

  }

}
