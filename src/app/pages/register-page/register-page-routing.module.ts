import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from '../../common/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
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
export class RegisterPageRoutingModule { }
