import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { SearchFilterAdvComponent } from './components/search-filter-adv/search-filter-adv.component';
import { FormControlsSharedModule } from '../../shared-modules/form-controls-shared.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormControlsSharedModule
  ],
  exports: [
    SearchFilterComponent
  ],
  declarations: [
    SearchFilterComponent,
    SearchFilterAdvComponent
  ]
})
export class SearchFilterModule { }
