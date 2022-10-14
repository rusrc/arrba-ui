import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Property } from '../../../../../models/property';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { showHideAnimation } from '../../../../../common/animations/showHide';
import { Store } from '@ngrx/store';
import { State } from '../../../../../store/reducers';
import * as fca from '../../../../../store/actions/filterControl/filter-control.actions';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-filter-adv',
  templateUrl: './search-filter-adv.component.html',
  animations: [
    showHideAnimation('showState', 350)
  ]
})
export class SearchFilterAdvComponent implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() properties: Property[];
  @Input() showState: string;

  changeValue$: Subject<{ value: any, property: Property }> = new Subject<{ value: any, property: Property }>();
  subscriptions: Subscription[] = [];
  selectedCheckBox: Property;

  constructor(private store: Store<State>) { }

  onChangedValue(data: { value: any, property: Property }) {
    this.changeValue$.next(data);
  }

  ngOnInit() {
    const subscription = this.changeValue$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(data => {
        this.store.dispatch(new fca.SetPropertyValueAction(data.property));
      });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
