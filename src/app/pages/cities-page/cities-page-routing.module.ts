import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitiesHomeComponent } from './components/cities-home/cities-home.component';
import { PageNotFoundComponent } from '../../common/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: CitiesHomeComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesPageRoutingModule { }
