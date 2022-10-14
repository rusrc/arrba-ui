import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Property } from '../../../../models/property';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlType } from '../../../../models/ControlType';
import { IFormControl } from '../../../../models/iFormControl';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit, OnChanges, IFormControl {

  @Input() form: FormGroup;
  @Input() property: Property;
  @Input() multiple = false;
  @Input() required = false;
  @Input() disabled = false;
  @Input() transparent = false;
  @Input() noTitle = false;
  @Input() defaultValue = false;
  @Output() changedValue: EventEmitter<{ value: any, property: Property }> = new EventEmitter<any>();

  get control() {
    return this.form.get(this.property.PropertyName);
  }

  ngOnInit() {
    if (this.property && this.property.ControlType === ControlType.Select.toString()) {
      this.form.addControl(this.property.PropertyName,
        this.required
          ? new FormControl(this.property.PropertyValue || '', Validators.required)
          : new FormControl(this.property.PropertyValue || ''));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.control) {
      this.control.setValue(changes.property.currentValue.PropertyValue);
    }
  }

  onChange(event: any, property: Property) {
    event.stopPropagation();
    property.PropertyValue = event.target.value;
    this.changedValue.emit({ value: event.target.value, property });
  }
}
