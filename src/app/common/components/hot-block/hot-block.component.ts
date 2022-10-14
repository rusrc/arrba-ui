import { HotItem } from '../../../models/hotItem';
import { Component, OnInit } from '@angular/core';
import { HotItemService } from '../../services/HotItem/hot-item.service';

@Component({
  selector: 'app-hot-block',
  templateUrl: './hot-block.component.html'
})
export class HotBlockComponent implements OnInit {

  hotItems: HotItem[];
  error: string;

  constructor(private hotItemService: HotItemService) { }

  ngOnInit() {
    this.hotItemService.Get(1).subscribe(
      hotItems => this.hotItems = hotItems,
      error => this.error = 'Error: ' + error
    );
  }

}
