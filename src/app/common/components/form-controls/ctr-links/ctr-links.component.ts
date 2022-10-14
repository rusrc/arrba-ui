import * as fca from '../../../../store/actions/filterControl/filter-control.actions';
import { Component, Input, OnInit } from '@angular/core';
import { LettererService } from '../../../../common/services/letterer/letterer.service';
import { State, getChangedControl } from '../../../../store/reducers';
import { Store } from '@ngrx/store';
import { showHideAnimation } from '../../../../common/animations/showHide';
import { IItemExtended } from '../../../../models/iItemExtended';
import { Property } from '../../../../models/property';
import { FormGroup, FormControl } from '@angular/forms';
import { TypeOfItems } from '../../../../models/typeOfItems';

@Component({
  selector: 'app-ctr-links',
  templateUrl: './ctr-links.component.html',
  animations: [
    showHideAnimation('showHideState', 500)
  ]
})
export class CtrLinksComponent implements OnInit {

  public showState = 'inactive';
  @Input() form: FormGroup;
  @Input() blockName: string;
  @Input() property: Property;
  @Input() headCount = 5;
  @Input() typeOfItems: TypeOfItems;
  selectedItem: any;

  constructor(
    private letterService: LettererService,
    private store: Store<State>
  ) { }

  get control() {
    return this.form.get(this.property.PropertyName);
  }

  ngOnInit(): void {
    this.form.addControl(this.property.PropertyName, new FormControl(this.property.PropertyValue || ''));
    this.store
      .select(getChangedControl(this.property.PropertyName))
      .subscribe(propertyValue => {
        if (propertyValue) {
          this.control.setValue(propertyValue);
        } else {
          this.control.setValue('');
        }
      });
  }

  selectOption(event: Event, item: IItemExtended) {
    event.preventDefault();
    if (this.selectedItem === item) {
      this.store.dispatch(new fca.InactivateItemOfFilterControlsAction(item));
    } else {
      this.store.dispatch(new fca.ActivateItemOfFilterControlsAction(item));
    }

    this.selectedItem = item;
    this.hideMore();
  }

  formMatrix() {
    return this.letterService.formMatrix(this.property.SelectOptions);
  }

  showMore() {
    this.showState = 'active';
  }

  hideMore() {
    this.showState = 'inactive';
  }

  toggleShowHide(event) {
    event.preventDefault();
    this.showState = this.showState === 'active' ? 'inactive' : 'active';
  }
}
