import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from '../../common/components/page-not-found/page-not-found.component';
import { DealerListComponent } from './components/dealer-list/dealer-list.component';

const routes: Routes = [
  { path: '', component: DealerListComponent },
  { path: ':id', component: HomeComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductItemListDealerPageRoutingModule { }
