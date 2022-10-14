import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlType } from '../../../../models/ControlType';
import { Property } from '../../../../models/property';

@Component({
  selector: 'app-check-box-group',
  templateUrl: './check-box-group.component.html'
})
export class CheckBoxGroupComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() properties: Property[];
  @Input() required = false;
  groupedProperties: { title: string, properties: Property[] }[] = [];

  ngOnInit() {
    if (this.properties) {
      const propertyGroupNames = this.properties
        .map(p => p.PropertyGroupName)
        .filter((value, index, self) => self.indexOf(value) === index);

      propertyGroupNames.forEach(groupName => {
        this.groupedProperties.push({
          title: groupName,
          properties: this.properties.filter(p => p.PropertyGroupName === groupName)
        });
      });

      this.properties.forEach(property => {
        if (property.ControlType === ControlType.CheckBox.toString()) {
          this.form.addControl(property.PropertyName,
            this.required
              ? new FormControl(property.PropertyValue || '', Validators.required)
              : new FormControl(property.PropertyValue || ''));
        }
      });
    }
  }

  split(array, columns = 2) {
    let index = 0;
    const arrayLength = array.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += columns) {
      const myChunk = array.slice(index, index + columns);
      tempArray.push(myChunk);
    }

    return tempArray;
  }
}
