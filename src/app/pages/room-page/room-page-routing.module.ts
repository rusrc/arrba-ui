import { RoomHomeComponent } from './components/room-home/room-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../../common/components/page-not-found/page-not-found.component';
import { RoomProfileComponent } from './components/room-profile/room-profile.component';
import { RoomImageEditComponent } from './components/room-image-edit/room-image-edit.component';

const routes: Routes = [
  { path: '', component: RoomHomeComponent },
  { path: 'profile', component: RoomProfileComponent },
  { path: 'edit-image/:id', component: RoomImageEditComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomPageRoutingModule { }
