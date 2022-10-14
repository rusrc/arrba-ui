import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from '../../common/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
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
export class LoginPageRoutingModule { }
