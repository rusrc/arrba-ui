
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardHomeComponent } from './components/card-home/card-home.component';
import { PageNotFoundComponent } from '../../common/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: CardHomeComponent },
  { path: ':item-name', component: CardHomeComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardPageRoutingModule { }
