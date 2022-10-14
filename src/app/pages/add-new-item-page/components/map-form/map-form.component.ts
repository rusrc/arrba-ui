import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Property } from '../../../../models/property';


@Component({
  selector: 'app-map-form',
  templateUrl: './map-form.component.html'
})
export class MapFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() citySelectControl: Property;
  selectedCountry: number;

  ngOnInit() {

  }

  selected(value, property: Property) {
    console.log(value, property);
  }
}
