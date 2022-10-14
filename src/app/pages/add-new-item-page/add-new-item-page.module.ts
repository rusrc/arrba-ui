import { AddNewItemHomeComponent } from './components/add-new-item-home/add-new-item-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewItemPageRoutingModule } from './add-new-item-page-routing.module';
import { SharedModule } from '../../common/shared-modules/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MapFormComponent } from './components/map-form/map-form.component';
import { PhotosFormComponent } from './components/photos-form/photos-form.component';
import { ContactsFormComponent } from './components/contacts-form/contacts-form.component';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';
import { AddNewItemListComponent } from './components/add-new-item-list/add-new-item-list.component';
import {
  AddNewItemCheckGuestComponent
} from './components/add-new-item-check-guest/add-new-item-check-guest.component';
import { AddNewItemSuccessComponent } from './components/add-new-item-success/add-new-item-success.component';
import { AddPhonesComponent } from './components/add-phones/add-phones.component';
import { FormControlsSharedModule } from '../../common/shared-modules/form-controls-shared.module';

@NgModule({
  imports: [
    CommonModule,
    AddNewItemPageRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    SharedModule,
    FormControlsSharedModule
  ],
  declarations: [
    AddNewItemHomeComponent,
    MapFormComponent,
    PhotosFormComponent,
    ContactsFormComponent,
    PhotoItemComponent,
    AddNewItemListComponent,
    AddNewItemCheckGuestComponent,
    AddNewItemSuccessComponent,
    AddPhonesComponent
  ]
})
export class AddNewItemPageModule { }
