import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationPageRoutingModule } from './information-page-routing.module';
import { AboutComponent } from './components/about/about.component';
import { CollaborationComponent } from './components/collaboration/collaboration.component';
import { ForDealersComponent } from './components/for-dealers/for-dealers.component';
import { ContranctComponent } from './components/contranct/contranct.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { InformationHomeComponent } from './components/information-home/information-home.component';
import { SharedModule } from '../../common/shared-modules/shared.module';
import { StoComponent } from './components/sto/sto.component';

@NgModule({
  declarations: [
    AboutComponent,
    CollaborationComponent,
    ForDealersComponent,
    ContranctComponent,
    FeedbackComponent,
    ContactsComponent,
    InformationHomeComponent,
    StoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InformationPageRoutingModule
  ]
})
export class InformationPageModule { }
