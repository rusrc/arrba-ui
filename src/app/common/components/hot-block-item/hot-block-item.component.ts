import { HotItem } from '../../../models/hotItem';
import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hot-block-item',
  templateUrl: './hot-block-item.component.html'
})
export class HotBlockItemComponent implements OnInit {

  @Input() hotItem: HotItem;

  constructor() { }

  ngOnInit() {
  }

}
