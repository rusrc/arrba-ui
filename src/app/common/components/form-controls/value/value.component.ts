import {
  Component,
  OnInit, Input,
  Output, EventEmitter,
  OnChanges, SimpleChanges
} from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Property } from '../../../../models/property';
import { ControlType } from '../../../../models/ControlType';
import { IFormControl } from '../../../../models/iFormControl';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html'
})
export class ValueComponent implements OnInit, OnChanges, IFormControl {

  @Input() form: FormGroup;
  @Input() property: Property;
  @Input() required = false;
  @Input() placeHolder;
  @Input() controlType = 'number';
  @Input() noTitle = false;
  @Output() changedValue: EventEmitter<{ value: any; property: Property; }> = new EventEmitter();

  get properType(): boolean {
    return (
      this.property
      && (this.property.ControlType === ControlType.Value.toString()
        || this.property.ControlType === ControlType.ValueFromTo.toString()));
  }

  get control(): AbstractControl {
    return this.form.get(this.property.PropertyName);
  }

  ngOnInit() {

    this.placeHolder = this.placeHolder || this.property.PropertyDescription || 'Значение...';

    if (this.properType) {
      const validators = [];
      if (this.controlType === 'number') {
        validators.push(Validators.pattern('^\\d+$'));
      }
      if (this.required) {
        validators.push(Validators.required);
      }
      this.form.addControl(this.property.PropertyName,
        new FormControl(this.property.PropertyValue || '', validators));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.control) {
      this.control.setValue(changes.property.currentValue.PropertyValue);
    }
  }

  changeValue(value, property: Property) {
    property.PropertyValue = value;
    this.changedValue.emit({ value: value, property: property });
  }
}
