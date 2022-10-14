import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck, SimpleChange } from '@angular/core';

import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { Subject } from 'rxjs';
import { Property } from '../../../../models/property';
import { SelectOption } from '../../../../models/selectOption';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ControlType } from '../../../../models/ControlType';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styles: []
})
export class SelectSearchComponent implements OnInit, OnChanges {

  private _change: Subject<any> = new Subject<any>();

  @Input() form: FormGroup;
  @Input() height = 200;
  @Input() property: Property;
  @Input() required = false;
  @Output() select: EventEmitter<SelectOption> = new EventEmitter<SelectOption>();

  selectedOption: SelectOption;
  options: SelectOption[];

  get control(): AbstractControl {
    return this.form.get(this.property.PropertyName);
  }

  get styles() {
    const style = {
      'max-height': this.height + 'px',
      'overflow': 'auto'
    };
    return style;
  }

  ngOnInit(): void {

    if (this.property && this.property.ControlType === ControlType.Select.toString()) {
      this.form.addControl(this.property.PropertyName,
        this.required
          ? new FormControl(this.property.PropertyValue || '', Validators.required)
          : new FormControl(this.property.PropertyValue || ''));
    }

    if (this.property && this.property.SelectOptions) {
      this.options = this.property.SelectOptions;
    }

    this._change.pipe(
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe((value: string) => {
      this.options = this.property.SelectOptions
        .filter(option => option.Name.toUpperCase().startsWith(value.toUpperCase()));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propertyName in changes) {
      if ((<Object>changes).hasOwnProperty(propertyName) && changes[propertyName].currentValue instanceof Property) {
        const chng: SimpleChange = changes[propertyName];
        const propety = <Property>chng.currentValue;
        this.options = propety.SelectOptions;
      }
    }
  }

  onSelect(event: Event, option: SelectOption) {
    event.preventDefault();
    event.stopPropagation();

    if (this.control) {
      this.control.setValue(option.ID);
    }

    this.selectedOption = option;
    this.select.emit(option);
  }

  onChange(event: any) {
    this._change.next(event.target.value);
  }
}
