import { Category } from '../../../models/category';
import { Observable, Subject } from 'rxjs';
import { SuperCategory } from '../../../models/superCategory';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as filterActions from '../../../store/actions/filterControl/filter-control.actions';
import { AuthorizationService } from '../../services/authorization/authorization.service';
import { Router } from '@angular/router';
import { IProfile } from '../../../models/profile';
import { ProfileService } from '../../services/profile/profile.service';
import { retry, takeUntil, filter } from 'rxjs/operators';
import { CityService } from '../../services/city/city.service';
import * as fromReducer from '../../../store/reducers';
import * as fromAction from './actions/categories.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  SuperCategories: SuperCategory[];
  Categories: Category[];
  countOfItemsDisplayedOnMenu = 10;
  profile$: Observable<IProfile>;
  showMenu = false;
  theme = '';
  showFilter = '';

  private componentDestroy: Subject<any> = new Subject<any>();

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private profileService: ProfileService,
    private cityService: CityService,
    private store: Store<fromReducer.State>
  ) { }

  get isAuthorized() {
    return this.authService.isAuthorized;
  }

  ngOnInit() {
    this.profile$ = this.profileService.get().pipe(retry(3));

    // Set superCategoies and categories
    this.store.pipe(
      select(fromReducer.getAllSuperCategories),
      filter(superCategories => superCategories.length > 0),
      takeUntil(this.componentDestroy)
    ).subscribe(superCategories => {
      this.SuperCategories = superCategories;
      this.Categories = superCategories.find(sc => sc.IsActive).Categories;
    });

    // Lisnening when filter expanded
    this.store.pipe(
      select(fromReducer.getExpandedFilterFlag),
      takeUntil(this.componentDestroy)
    ).subscribe(showState => this.showFilter = showState);

    // Load super categories and categories
    this.store.dispatch(new fromAction.LoadSuperCategories());
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  /**
   * Generate routerLink for category link
   * @param category
   */
  getRouterLink(category: Category) {
    const city = this.cityService.cityInLocalStorage;
    if (city && city.Alias) {
      return ['cities', city.Alias, 'categories', category.Alias];
    } else {
      return ['categories', category.Alias];
    }
  }

  /**
   * Set active super category for menu
   * @param event
   * @param superCategory
   */
  goToSuperCategory(event, superCategory: SuperCategory) {
    event.preventDefault();
    event.stopPropagation();
    this.store.dispatch(new fromAction.ActivateSuperCategoryAction(superCategory));
  }

  /**
   * Set active subcategory for menu and filter control
   * @param event
   * @param category
   * @param anchor
   */
  goToSubCategory(event: Event, category: Category, anchor: Element) {
    event.preventDefault();
    event.stopPropagation();
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.store.dispatch(new fromAction.ActivateCategoryAction(category));
    this.store.dispatch(new filterActions.LoadFilterControlsAction(category.ID));
  }

  logout(event) {
    event.preventDefault();
    if (this.authService.deleteToken()) {
      this.router.navigate(['/']);
    }
  }

  scrollToAnchor1(element: Element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  // TODO: need refactoring later
  switchTheme() {
    const themeName = 'darkly';
    const url = `https://bootswatch.com/4/${themeName}/bootstrap.min.css`;
    if (!this.theme) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('type', 'text/css');
      link.setAttribute('href', url);
      document.getElementsByTagName('head')[0].appendChild(link);
      const font = document.getElementById('font-id');
      console.log(font);
      this.theme = themeName;
    } else {
      this.theme = '';
      const links = document.getElementsByTagName('link');
      for (const key in links) {
        if (links.hasOwnProperty(key)) {
          const element = links[key];
          const regex = new RegExp(themeName, 'ig');
          if (regex.test(element.href)) {
            element.remove();
          }
        }
      }
    }
  }
}
