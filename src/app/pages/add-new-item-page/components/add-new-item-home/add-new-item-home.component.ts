import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Property } from '../../../../models/property';
import { ControlType } from '../../../../models/ControlType';
import { BrandService } from '../../../../common/services/Brand/brand.service';
import { ModelService } from '../../../../common/services/Model/model.service';
import { Observable, combineLatest, Subject } from 'rxjs';
import { ItemTypeService } from '../../../../common/services/ItemType/item-type.service';
import { PropertyService } from '../../../../common/services/property/property.service';
import { CityService } from '../../../../common/services/city/city.service';
import { showHideAnimation } from '../../../../common/animations/showHide';
import { CurrencyService } from '../../../../common/services/currency/currency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GRECAPTCHA_SITEKEY } from '../../../../common/constants/constants';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../common/services/category/category.service';
import { VehicleService } from '../../../../common/services/Vehicle/vehicle.service';
import { AuthorizationService } from '../../../../common/services/authorization/authorization.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { State } from '../../../../store/reducers';
import { AddNewItemAction } from '../../../../store/actions/addNewItem/add-new-item.actions';
import { IProfile } from '../../../../models/profile';
import { ProfileService } from '../../../../common/services/profile/profile.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SelectOption } from '../../../../models/selectOption';


@Component({
  selector: 'app-add-new-item-home',
  templateUrl: './add-new-item-home.component.html',
  styles: [`
    legend {
        cursor: pointer
    }`],
  animations: [
    showHideAnimation('showFilterState', 500)
  ]
})
export class AddNewItemHomeComponent implements OnInit, OnDestroy {

  public siteKey = GRECAPTCHA_SITEKEY;
  public mainFieldSet = 'inactive';
  public otherFieldSet = 'inactive';

  categoryId: number;
  category: Category;

  errorMessage: string;
  breadcrumbRoutes: Array<{ key: string, value: any }>;
  form: FormGroup;
  brand: Property;
  model: Property;
  itemType: Property;
  city: Property;
  currency: Property;
  year: Property;
  price: Property;
  email: Property;
  newModel: Property;
  props: Property[];
  profile$: Observable<IProfile>;

  ready = false;

  componentOnDestroy$: Subject<any> = new Subject<any>();

  constructor(
    private brandService: BrandService,
    private modelService: ModelService,
    private typeService: ItemTypeService,
    private propertyService: PropertyService,
    private cityService: CityService,
    private currencyServcie: CurrencyService,
    private acitveRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private vehicleService: VehicleService,
    private authService: AuthorizationService,
    private profileService: ProfileService,
    private store: Store<State>) { }

  async ngOnInit() {
    this.breadcrumbRoutes = [
      { key: 'главная', value: '/' },
      { key: 'подать объявление', value: ['/add-new-item'] }
    ];

    this.categoryId = this.acitveRoute.snapshot.params['categoryId'];

    this.form = new FormGroup({
      // 'BrandId': new FormControl(''),
      // 'modelId': new FormControl(''),
      'modelValue': new FormControl(''),
      'countryId': new FormControl(1),
      'categoryId': new FormControl(this.categoryId),
      'superCategoryId': new FormControl(1),
      'additionalComment': new FormControl(''),
      'properties': new FormGroup({})
    });

    this.year = new Property('year', ControlType.Value, 'Год', '');
    this.price = new Property('price', ControlType.Value, 'Цена', '');
    this.email = new Property('email', ControlType.Value, 'Email', '');
    this.newModel = new Property('newModel', ControlType.Value, 'Если не нашли модель', '');

    this.acitveRoute.params.pipe(
      switchMap(params => {
        const categoryId = params['categoryId'];

        return combineLatest([
          this.brandService.GetAll(categoryId),
          this.typeService.GetAll(categoryId),
          this.propertyService.GetAll(categoryId, true),
          this.cityService.getAll(1),
          this.currencyServcie.GetAll(),
          this.categoryService.getById(this.categoryId)]);
      }),
      takeUntil(this.componentOnDestroy$)
    ).subscribe(([brands, types, props, cities, currencies, category]) => {

      this.brand = new Property('BrandId', ControlType.Select, 'Ваш бренд', '', brands);
      this.itemType = new Property('TypeId', ControlType.Select, 'Тип', '', types);
      this.city = new Property('CityId', ControlType.Select, 'Ваш город', '', cities);
      this.currency = new Property('CurrencyId', ControlType.Select, 'Валюта', '', currencies);
      this.props = props;
      this.category = category;
      this.ready = true;

      this.breadcrumbRoutes.push({ key: `раздел ${category.Name}`, value: '/' });
    });

    this.profile$ = this.profileService.get();
  }

  get isAuthorized() {
    return this.authService.isAuthorized;
  }
  get formProperties() {
    return this.form.get('properties') as FormGroup;
  }

  mapOptions(property: Property) {
    return property.SelectOptions.map(o => ({ label: o.Name, value: o.ID }));
  }

  getSelects(properies: Property[]) {
    if (properies && properies.length) {
      return properies.filter(p => p.ControlType === ControlType.Select.toString());
    }
    return;
  }

  getValues(properies: Property[]) {
    if (properies && properies.length) {
      return properies.filter(
        p => p.ControlType === ControlType.Value.toString() || p.ControlType === ControlType.ValueFromTo.toString()
      );
    }
    return;
  }

  getChecks(properies: Property[]) {
    if (properies && properies.length) {
      return properies.filter(p => p.ControlType === ControlType.CheckBox.toString());
    }
    return;
  }

  resolvedCaptcha(reCaptchaToken: string) {
    const controlName = 'reCaptcha';
    const reCaptchaControl = this.form.get(controlName);
    if (reCaptchaControl) {
      reCaptchaControl.setValue(reCaptchaToken);
    } else {
      this.form.addControl(controlName, new FormControl(reCaptchaToken));
    }
  }

  onSubmit() {
    if (!this.form.invalid) {
      this.vehicleService.add(this.form.value).subscribe(response => {

        const itemId = +response.body;
        const text = 'Успешно добавлен';
        this.store.dispatch(new AddNewItemAction({
          itemId: itemId,
          text: text
        }));

        this.router.navigate(['add-new-item', 'success']);

      }, (response: HttpErrorResponse) => {
        if (response.status === 401) {
          console.log('c%TODO: Looks like token expired', 'color:orange');
          this.authService.deleteTokens();
          this.router.navigate(['add-new-item', 'checkguest']);
        }
        console.error(response);
        this.errorMessage = response.error.ExceptionMessage || response.error.Message || response.statusText;
      });
    } else {
      console.error(this.getFormValidationErrors(this.form.controls));
    }
  }

  ngOnDestroy() {
    this.componentOnDestroy$.next();
    this.componentOnDestroy$.complete();
  }

  onBrandSelected(option: SelectOption) {
    this.modelService
      .GetAll(this.categoryId, option.ID)
      .pipe(takeUntil(this.componentOnDestroy$))
      .subscribe(models => {
        this.model = new Property('modelId', ControlType.Select, 'Ваша модель', '', models);
      });
  }

  toggleMainFieldSet() {
    this.mainFieldSet = this.mainFieldSet === 'active' ? 'inactive' : 'active';
  }

  toggleOtherFieldSet() {
    this.otherFieldSet = this.otherFieldSet === 'active' ? 'inactive' : 'active';
  }

  private getFormValidationErrors(controls) {
    let errors = [];
    Object.keys(controls).forEach(key => {
      const control = controls[key];
      if (control instanceof FormGroup) {
        errors = errors.concat(this.getFormValidationErrors(control.controls));
      }
      const controlErrors = controls[key].errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[keyError]
          });
        });
      }
    });
    return errors;
  }
}
