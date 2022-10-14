import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IUserPhone } from '../../../../models/iUserPhone';

@Component({
  selector: 'app-card-phone-number',
  templateUrl: './card-phone-number.component.html',
  styles: []
})
export class CardPhoneNumberComponent implements OnInit {

  @Output() click: EventEmitter<any> = new EventEmitter<any>();
  @Input() phone: IUserPhone;

  constructor() { }

  ngOnInit() {
  }

  showPhoneNumber(event) {
    this.click.emit({ 'event': event, 'phone': this.phone });
  }
}
