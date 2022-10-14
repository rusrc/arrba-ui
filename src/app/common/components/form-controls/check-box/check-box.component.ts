import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Property } from '../../../../models/property';
import { ControlType } from '../../../../models/ControlType';
import { IFormControl } from '../../../../models/iFormControl';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styles: []
})
export class CheckBoxComponent implements OnInit, OnChanges, IFormControl {

  @Input() form: FormGroup;
  @Input() property: Property;
  @Input() link: string;
  @Input() linkText: string;
  @Output() changedValue: EventEmitter<{ value: any, property: Property }> = new EventEmitter();
  isChecked = false;

  constructor() { }

  get control() {
    return this.form.get(this.property.PropertyName);
  }

  ngOnInit() {
    if (this.property.ControlType === ControlType.CheckBox.toString()) {
      this.form.addControl(this.property.PropertyName, new FormControl(this.property.PropertyValue || ''));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.control) {
      this.control.setValue(changes.property.currentValue.PropertyValue);
    }
  }

  changeValue(value, property: Property) {
    this.isChecked = !this.isChecked;
    value = this.isChecked;
    property.PropertyValue = value;
    this.changedValue.emit({ value: value, property: property });
  }
}
