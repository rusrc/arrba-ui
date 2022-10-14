import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FromToTextInputComponent } from '../components/form-controls/from-to-text-input/from-to-text-input.component';
import { SelectComponent } from '../components/form-controls/select/select.component';
import { SelectInlineComponent } from '../components/form-controls/select-inline/select-inline.component';
import { CheckBoxGroupComponent } from '../components/form-controls/check-box-group/check-box-group.component';
import { ValueComponent } from '../components/form-controls/value/value.component';
import { CtrLinksComponent } from '../components/form-controls/ctr-links/ctr-links.component';
import { CheckBoxButtonComponent } from '../components/form-controls/check-box-button/check-box-button.component';
import { CheckBoxComponent } from '../components/form-controls/check-box/check-box.component';
import { SelectSearchComponent } from '../components/form-controls/select-search/select-search.component';

@NgModule({
  declarations: [
    FromToTextInputComponent,
    SelectInlineComponent,
    SelectComponent,
    ValueComponent,
    CtrLinksComponent,
    CheckBoxGroupComponent,
    CheckBoxButtonComponent,
    CheckBoxComponent,
    SelectSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FromToTextInputComponent,
    SelectInlineComponent,
    SelectComponent,
    ValueComponent,
    CtrLinksComponent,
    CheckBoxGroupComponent,
    CheckBoxButtonComponent,
    CheckBoxComponent,
    SelectSearchComponent
  ]
})
export class FormControlsSharedModule { }
