import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Property } from '../../../../models/property';
import { ControlType } from '../../../../models/ControlType';
import { SelectOption } from '../../../../models/selectOption';

@Component({
  selector: 'app-select-inline',
  templateUrl: './select-inline.component.html'
})
export class SelectInlineComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() property: Property;
  @Input() required = false;
  @Input() title = '';
  @Input() uppercase = false;
  selectedOption: SelectOption;

  ngOnInit() {
    if (this.property && this.property.ControlType === ControlType.Select.toString()) {
      this.form.addControl(this.property.PropertyName,
        this.required
          ? new FormControl(this.property.PropertyValue || '', Validators.required)
          : new FormControl(this.property.PropertyValue || ''));
    }
  }

  get control() {
    return this.form.get(this.property.PropertyName);
  }

  parseMetaData(json: string) {
    if (json) {
      return JSON.parse(json);
    }
    return {};
  }

  onSelect(event, option: SelectOption) {
    event.preventDefault();
    // TODO: set errors if not selected
    this.control.markAsTouched();
    this.selectedOption = this.selectedOption === option ? undefined : option;
    let value;
    if (this.selectedOption) {
      value = this.selectedOption.ID;
    }
    this.form.get(this.property.PropertyName).setValue(value);
  }
}
