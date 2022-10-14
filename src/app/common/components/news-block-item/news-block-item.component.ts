import { Component, Input } from '@angular/core';
import { IMedia } from '../../../models/iMedia';

@Component({
  selector: 'app-news-block-item',
  templateUrl: './news-block-item.component.html'
})
export class NewsBlockItemComponent {
  @Input() item: IMedia;
  @Input() index: number;
}
