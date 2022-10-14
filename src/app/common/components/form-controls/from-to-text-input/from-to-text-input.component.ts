import {
  Component,
  OnInit, Input,
  OnDestroy,
  OnChanges, SimpleChanges, Output, EventEmitter
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Property } from '../../../../models/property';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IFormControl } from '../../../../models/iFormControl';


@Component({
  selector: 'app-from-to-text-input',
  templateUrl: './from-to-text-input.component.html',
  styles: []
})
export class FromToTextInputComponent implements OnInit, OnDestroy, OnChanges, IFormControl {

  @Input() form: FormGroup;
  @Input() from: Property;
  @Input() to: Property;
  @Input() title: string;
  @Output() changedValue: EventEmitter<{ value: any, property: Property }> = new EventEmitter();

  @Input() nestedSelectProperty?: Property;

  @Input() fromPlaceHolder: string;
  @Input() toPlaceHolder: string;

  private changeValue$: Subject<any> = new Subject<any>();
  private subscriptions: Subscription[] = [];

  get fromControl() {
    return this.form.get(this.from.PropertyName);
  }

  get toControl() {
    return this.form.get(this.to.PropertyName);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.fromControl) {
      this.fromControl.setValue(changes.from.currentValue.PropertyValue);
    }
    if (this.toControl) {
      this.toControl.setValue(changes.to.currentValue.PropertyValue);
    }
  }

  ngOnInit() {
    this.form.addControl(this.from.PropertyName, new FormControl(this.from.PropertyValue || ''));
    this.form.addControl(this.to.PropertyName, new FormControl(this.to.PropertyValue || ''));

    this.subscriptions.push(this.changeValue$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((param: { value: any, property: Property }) => {
        this.changedValue.emit(param);
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  changeValue(value, property: Property) {
    property.PropertyValue = value;
    this.changeValue$.next({ value: value, property: property });
  }
}
