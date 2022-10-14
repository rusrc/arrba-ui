import { SharedModule } from '../../common/shared-modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomPageRoutingModule } from './room-page-routing.module';
import { RoomHomeComponent } from './components/room-home/room-home.component';
import { SelectInlineFilterComponent } from './components/select-inline-filter/select-inline-filter.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { RoomPaidServiceComponent } from './components/room-paid-service/room-paid-service.component';
import { RoomPaidServiceListComponent } from './components/room-paid-service-list/room-paid-service-list.component';
import { RoomSettingsButtonsComponent } from './components/room-settings-buttons/room-settings-buttons.component';
import { RoomProfileComponent } from './components/room-profile/room-profile.component';
import { SelectInlineStatusComponent } from './components/select-inline-status/select-inline-status.component';
import { RoomCardDescriptionComponent } from './components/room-card-description/room-card-description.component';
import { RoomCardPriceComponent } from './components/room-card-price/room-card-price.component';
import { RoomImageEditComponent } from './components/room-image-edit/room-image-edit.component';
import { RoomCardSimpleComponent } from './components/room-card-simple/room-card-simple.component';

@NgModule({
  imports: [
    CommonModule,
    RoomPageRoutingModule,
    SharedModule
  ],
  declarations: [
    RoomHomeComponent,
    SelectInlineFilterComponent,
    RoomCardComponent,
    RoomPaidServiceComponent,
    RoomPaidServiceListComponent,
    RoomSettingsButtonsComponent,
    RoomProfileComponent,
    SelectInlineStatusComponent,
    RoomCardDescriptionComponent,
    RoomCardPriceComponent,
    RoomImageEditComponent,
    RoomCardSimpleComponent
  ]
})
export class RoomPageModule { }
