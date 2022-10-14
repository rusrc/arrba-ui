import { AddNewItemHomeComponent } from './components/add-new-item-home/add-new-item-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../../common/components/page-not-found/page-not-found.component';
import { AddNewItemListComponent } from './components/add-new-item-list/add-new-item-list.component';
import {
  AddNewItemCheckGuestComponent
} from './components/add-new-item-check-guest/add-new-item-check-guest.component';
import { GuestGuard } from '../../common/guards/auth/guest.guard';
import { AddNewItemSuccessComponent } from './components/add-new-item-success/add-new-item-success.component';

const routes: Routes = [
  { path: '', component: AddNewItemListComponent },
  { path: 'checkguest', component: AddNewItemCheckGuestComponent },
  { path: 'success', component: AddNewItemSuccessComponent },
  {
    path: ':categoryId', component: AddNewItemHomeComponent,
    canActivate: [GuestGuard]
  },
  {
    path: '', redirectTo: '/', pathMatch: 'full'
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewItemPageRoutingModule { }
