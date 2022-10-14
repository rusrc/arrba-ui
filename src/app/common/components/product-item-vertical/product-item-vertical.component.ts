import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-item-vertical',
  templateUrl: './product-item-vertical.component.html'
})
export class ProductItemVerticalComponent {
  @Input() productItem;
}
