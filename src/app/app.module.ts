import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './common/main-layout/app.component';
import { HomeComponent } from './pages/home-page/home.component';
import { FooterComponent } from './common/components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './common/shared-modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductItemListPageComponent } from './pages/product-item-list-page/product-item-list-page.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { rootReducer, metaReducers } from './store/reducers';
import { FilterControlEffects } from './store/effects/FilterControl/filter-control.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './common/interceptors/TokenIntercepter';
import { CollapseFilterResolver } from './common/resolvers/collapseFilterResolver/collapse-filter.resolver';
import {
  ProductItemVerticalComponent
} from './common/components/product-item-vertical/product-item-vertical.component';
import {
  NgbModalModule
} from '@ng-bootstrap/ng-bootstrap';
import { CityInterceptor } from './common/interceptors/cityIntercepter';
import { DeferLoadDirective } from './common/directives/defer-load.directive';
import { CardItemEffects } from './pages/card-page/effects/card-item.effects';
import { CategoriesEffects } from './common/components/header/effects/categories.effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './store/CustomSerializer';
import { NgrxRouterStoreModule } from './store/ngrx-router.module';
import { keyframes } from '@angular/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    ProductItemListPageComponent,
    ProductItemVerticalComponent,
    DeferLoadDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    StoreModule.forRoot(rootReducer, { metaReducers }),
    !environment.production
      ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([FilterControlEffects, CardItemEffects, CategoriesEffects]),
    // NgrxRouterStoreModule,
    // StoreRouterConnectingModule.forRoot({ stateKey: 'routerFromRootReducer' }),
    StoreRouterConnectingModule.forRoot(),
    NgbModalModule,
    BrowserTransferStateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CityInterceptor,
      multi: true
    },
    // {
    //   provide: RouterStateSerializer,
    //   useClass: CustomSerializer
    // },
    CollapseFilterResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
