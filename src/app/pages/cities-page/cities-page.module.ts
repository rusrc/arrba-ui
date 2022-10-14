import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesPageRoutingModule } from './cities-page-routing.module';
import { CitiesHomeComponent } from './components/cities-home/cities-home.component';
import { SharedModule } from '../../common/shared-modules/shared.module';


@NgModule({
  declarations: [CitiesHomeComponent],
  imports: [
    CommonModule,
    CitiesPageRoutingModule,
    SharedModule
  ]
})
export class CitiesPageModule { }
