import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../../common/components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { CollaborationComponent } from './components/collaboration/collaboration.component';
import { ForDealersComponent } from './components/for-dealers/for-dealers.component';
import { ContranctComponent } from './components/contranct/contranct.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { StoComponent } from './components/sto/sto.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'sto', component: StoComponent},
  { path: 'about', component: AboutComponent },
  { path: 'collaboration', component: CollaborationComponent },
  { path: 'for-dealers', component: ForDealersComponent },
  { path: 'contranct', component: ContranctComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationPageRoutingModule { }
