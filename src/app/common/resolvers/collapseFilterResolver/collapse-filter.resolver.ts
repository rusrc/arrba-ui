import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../../store/reducers/FilterControl/filter-control.reducer';
import { ExpandFilterAction } from '../../../store/actions/filterControl/filter-control.actions';

/**
 * Collapsing the expanded filter
 */
@Injectable()
export class CollapseFilterResolver implements Resolve<string> {

    constructor(private store: Store<State>) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        this.store.dispatch(new ExpandFilterAction('inactive'));
        return true;
    }
}
