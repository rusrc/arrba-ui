import { ROOT_HOST } from '../../constants/constants';
import { Injectable } from '@angular/core';
import { SuperCategory } from '../../../models/superCategory';
import { Observable, BehaviorSubject } from 'rxjs';

import { map } from 'rxjs/operators';
import { IStateService } from '../IStateService';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../models/category';
import { SuperCategsAndCategsWithBrand } from '../../../pages/home-page/models/SuperCategsAndCategsWithBrand';


@Injectable({
  providedIn: 'root'
})
export class SuperCategoryService implements IStateService<SuperCategory[]> {

  private _state = new BehaviorSubject<SuperCategory[]>([]);

  constructor(private http: HttpClient) { }

  GetSuperCategsAndCategsWithBrandList(cityAlias?: string): Observable<SuperCategsAndCategsWithBrand[]> {
    let url = '';
    if (cityAlias) {
      url = ROOT_HOST + `/api/SuperCategory/GetSuperCategories?cityAlias=${cityAlias}`;
    } else {
      url = ROOT_HOST + `/api/SuperCategory/GetSuperCategories`;
    }
    return this.http.get(url).pipe(map(resp => resp as SuperCategsAndCategsWithBrand[]));
  }

  public Get(id: number): Observable<SuperCategory> {
    const url = `${ROOT_HOST}/api/SuperCategory/${id}`;
    return this.http.get(url).pipe(map(resp => resp as SuperCategory));
  }

  public GetAll(): Observable<SuperCategory[]> {
    const url = `${ROOT_HOST}/api/SuperCategory/GetAll`;
    return this.http.get(url).pipe(map(resp => resp as SuperCategory[]));
  }
  /**
   * Update the current state
   */
  setState(superCategories: SuperCategory[]): void {
    this._state.next(superCategories);
  }

  /**
   * The observable state
   */
  public get state$(): Observable<SuperCategory[]> {
    return this._state.asObservable();
  }

  /**
   * Return the current state
   */
  public getState(): SuperCategory[] {
    return this._state.value;
  }

  public async getStateAsync(): Promise<SuperCategory[]> {
    return await this.state$.toPromise();
  }

  public getActiveSuperCategory(): SuperCategory {
    const superCategory = this.getSafe(() => this.getState().find(sc => sc.IsActive));
    return superCategory;
  }

  public getActiveCategory(): Category {
    const category = this.getSafe(() => this.getState().find(sc => sc.IsActive).Categories.find(c => c.IsActive));
    return category;
  }

  private getSafe(lamda) {
    try {
      return lamda();
    } catch (e) {
      return undefined;
    }
  }

}
