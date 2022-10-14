import { EventEmitter } from '@angular/core';
import { Property } from './property';

export interface IFormControl {
    changedValue: EventEmitter<{ value: any, property: Property }>;
}
