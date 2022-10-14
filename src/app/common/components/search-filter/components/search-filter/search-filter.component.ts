import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';
import { showHideAnimation } from '../../../../../common/animations/showHide';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, BehaviorSubject, Subject, Observable } from 'rxjs';
import { SuperCategory } from '../../../../../models/superCategory';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from '../../../../../store/reducers';
import * as fca from '../../../../../store/actions/filterControl/filter-control.actions';
import { FormGroup } from '@angular/forms';
import { Property } from '../../../../../models/property';
import { ControlType } from '../../../../../models/ControlType';
import { VehicleService } from '../../../../../common/services/Vehicle/vehicle.service';
import { CityService } from '../../../../../common/services/city/city.service';
import { CurrencyService } from '../../../../../common/services/currency/currency.service';
import { List } from 'immutable';
import * as fromRootReducer from '../../../../../store/reducers';


@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  animations: [
    showHideAnimation('showFilterState', 500)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFilterComponent implements OnInit, OnDestroy {

  private changeValue$: Subject<any> = new Subject<any>();

  componentDestroy = new Subject();
  cityName: string;
  data$: Observable<any>;

  public showFilterAdvancedState = 'inactive';
  public error: string;
  public form: FormGroup = new FormGroup({});
  public onSubmitState$: BehaviorSubject<{ submit: boolean, formValue: any }> = new BehaviorSubject({ submit: false, formValue: {} });

  @Input() showState = 'inactive';
  @Output() submit: EventEmitter<boolean> = new EventEmitter<false>();

  constructor(
    private cityService: CityService,
    private vehicleService: VehicleService,
    private currencyService: CurrencyService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<State>) { }

  ngOnInit() {
    this.cityName = this.route.snapshot.paramMap.get('city');
    // For navigation only. Form data from state. If implement formGroup then remove that.*/
    const superCategories$ = this.store.pipe(select(fromRootReducer.getAllSuperCategories));
    const selectedSearchData$ = this.store.pipe(select(fromRootReducer.getSelectedSearchData));

    combineLatest([superCategories$, selectedSearchData$, this.onSubmitState$]
    ).pipe(
      takeUntil(this.componentDestroy)
    ).subscribe(([activeCategory, filterState, submitData]) => {
      const { submit, formValue } = submitData;
      if (submit) {
        this.navigate(activeCategory, filterState, formValue);
        this.onSubmitState$.next({ ...submitData, ...{ submit: false } });
        this.submit.emit(true);
      }
    },
      error => this.error = error);

    // Main state of all filterControls
    const selectedFilterControls$ = this.store.pipe(select(fromRootReducer.getActiveFilterControls));
    const selectedModels$ = this.store.pipe(select(fromRootReducer.getActiveModels));

    this.data$ = combineLatest([selectedFilterControls$, selectedModels$])
      .pipe(map(data => {
        const [controls] = data;

        return {
          priceFrom: new Property('priceFrom', ControlType.ValueFromTo, '', controls.priceFrom || ''),
          priceTo: new Property('priceTo', ControlType.ValueFromTo, '', controls.priceTo || ''),
          yearFrom: new Property('yearFrom', ControlType.ValueFromTo, '', controls.yearFrom || ''),
          yearTo: new Property('yearTo', ControlType.ValueFromTo, '', controls.yearTo || ''),
          itemType: new Property('typeId', ControlType.Select, '', controls.typeId, controls.itemTypes),
          itemBrand: new Property('brandId', ControlType.Select, '', controls.brandId, controls.itemBrands),
          itemModel: new Property('modelId', ControlType.Select, '', controls.modelId, controls.itemModels),
          currency: new Property('currencyId', ControlType.Select, '', controls.currencyId, this.currencyService.getAllHardCoded()),
          hasPhoto: new Property('hasPhoto', ControlType.CheckBox, 'Есть фото', controls.hasPhoto),
          hotSelling: new Property('hotSelling', ControlType.CheckBox, 'Срочно, торг.', controls.hotSelling),
          customsCleared: new Property('customsCleared', ControlType.CheckBox, 'Растаможен', controls.customsCleared),
          instalmentSelling: new Property('instalmentSelling', ControlType.CheckBox, 'В расрочку', controls.instalmentSelling),
          exchangePossible: new Property('exchangePossible', ControlType.CheckBox, 'Возможен обмен', controls.exchangePossible),
          vehicleCondition: new Property('vehicleCondition', ControlType.Select, 'Состояние', controls.vehicleCondition,
            this.vehicleService.getConditions()),
          // FIXME: fix later
          properties: List<Property>(controls.itemProperties).toArray()
        };
      }));

    this.changeValue$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.componentDestroy)
      ).subscribe((param: { value: any, property: Property }) => {
        this.store.dispatch(new fca.SetControlValueAction(param));
      });
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  onChangedValue(data: { value: any, property: Property }) {
    this.changeValue$.next(data);
  }

  /**
   * TODO: NEED DEEP REFACTORING!
   * Form new URI from active filter state and current active category
   * {sub-category-name}/{brand-name}/{model-name}
   * Example of URI: /Mopedy-i-skutery/ABAT/Raton
   * */
  navigate(superCategories: SuperCategory[], filterState, formValue: any) {

    // TODO simplify, add getActiveCategory in redux reducer
    const categoryName = this.getSafe(() => superCategories.find(c => c.IsActive).Categories.find(c => c.IsActive).Alias) || '';
    const urlSegments = [categoryName, filterState.brandName, filterState.modelName].filter(e => e);

    // TODO: workaround need remove start
    formValue.brandId = '';
    formValue.modelId = '';
    // TODO: workaround need remove end

    formValue = this.removeEmpty(formValue);

    const cityName = this.cityService.cityInLocalStorage ? this.cityService.cityInLocalStorage.Alias : '';

    // If city exists do query with city name
    if (cityName) {
      this.router.navigate(
        [...['cities', cityName, 'categories'], ...urlSegments],
        { queryParams: formValue }
      );
    } else {
      this.router.navigate(
        [...['categories'], ...urlSegments],
        { queryParams: formValue },
      );
    }
  }

  onSubmit() {
    this.onSubmitState$.next({
      submit: true,
      formValue: this.form.value
    });
  }

  hideFilter(event: Event) {
    event.preventDefault();
    this.store.dispatch(new fca.ExpandFilterAction('inactive'));
  }

  toggleAdvanceFilterDisplay(event) {
    event.preventDefault();
    this.showFilterAdvancedState = this.showFilterAdvancedState === 'active' ? 'inactive' : 'active';
  }

  private removeEmpty(obj) {
    Object.entries(obj).forEach(([key, val]) =>
      (val && typeof val === 'object') && this.removeEmpty(val) ||
      (val === null || val === '' || val === false) && delete obj[key]
    );
    return obj;
  }

  private getSafe(lamda) {
    try {
      return lamda();
    } catch (e) {
      return undefined;
    }
  }
}
