import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../common/shared-modules/shared.module';
import { FormControlsSharedModule } from '../../common/shared-modules/form-controls-shared.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormControlsSharedModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterPageModule { }
