import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Property } from '../../../../models/property';
import { ControlType } from '../../../../models/ControlType';
import { IFormControl } from '../../../../models/iFormControl';

@Component({
  selector: 'app-check-box-button',
  templateUrl: './check-box-button.component.html',
  styles: []
})
export class CheckBoxButtonComponent implements OnInit, IFormControl {

  @Input() form: FormGroup;
  @Input() property: Property;
  @Input() active = false;
  @Output() changedValue: EventEmitter<{ value: any, property: Property }> = new EventEmitter();
  isChecked = false;

  constructor() { }

  ngOnInit() {
    if (this.property.ControlType === ControlType.CheckBox.toString()) {
      this.form.addControl(this.property.PropertyName, new FormControl(this.property.PropertyValue || ''));
    }
  }

  get control() {
    return this.form.get(this.property.PropertyName);
  }

  changeValue(value, property: Property) {
    this.isChecked = !this.isChecked;
    value = this.isChecked;
    property.PropertyValue = value;
    this.changedValue.emit({ value: value, property: property });
  }

}
