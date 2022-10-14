import { CardHomeComponent } from './components/card-home/card-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPageRoutingModule } from './card-page-routing.module';
import { SharedModule } from '../../common/shared-modules/shared.module';
import { CardImageComponent } from './components/card-image/card-image.component';
import { CardRatingComponent } from './components/card-rating/card-rating.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { AgmCoreModule } from '@agm/core';
import '../../../icons';
import { CardMapComponent } from './components/card-map/card-map.component';
import { CardPhoneNumberComponent } from './components/card-phone-number/card-phone-number.component';

@NgModule({
  imports: [
    CommonModule,
    CardPageRoutingModule,
    SharedModule,
    ShareButtonsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6YmI7_4__d_bsZ-w1SCwk7BNoGUKDQ_g'
    })
  ],
  declarations: [
    CardHomeComponent,
    CardImageComponent,
    CardRatingComponent,
    CardMapComponent,
    CardPhoneNumberComponent
  ],
})
export class CardPageModule { }
