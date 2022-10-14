import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input() disable = true;
  @Input() width = 400;
  @Input() height = 400;
  @Input() images;

  constructor() { }

  ngOnInit() {
    if (!this.images && !this.disable) {
      this.images = [1, 2, 3].map(() => `https://picsum.photos/${this.width}/${this.height}?random&t=${Math.random()}`);
    }
  }
}
