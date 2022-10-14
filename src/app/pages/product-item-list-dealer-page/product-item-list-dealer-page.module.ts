import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductItemListDealerPageRoutingModule } from './product-item-list-dealer-page-routing.module';
import { HomeComponent } from '../../pages/product-item-list-dealer-page/components/home/home.component';
import { SharedModule } from '../../common/shared-modules/shared.module';
import { DealerListComponent } from './components/dealer-list/dealer-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    DealerListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductItemListDealerPageRoutingModule
  ]
})
export class ProductItemListDealerPageModule { }
