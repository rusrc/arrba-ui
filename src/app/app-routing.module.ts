import { RouterModule, UrlSegment, UrlSegmentGroup, Route } from '@angular/router';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-page/home.component';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { ProductItemListPageComponent } from './pages/product-item-list-page/product-item-list-page.component';
import { AuthGuard } from './common/guards/auth/auth.guard';
import { CollapseFilterResolver } from './common/resolvers/collapseFilterResolver/collapse-filter.resolver';
import { CategoriesComponent } from './pages/home-page/components/categories/categories.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cities/:city', component: HomeComponent },
    {
        path: 'add-new-item',
        loadChildren: './pages/add-new-item-page/add-new-item-page.module#AddNewItemPageModule',
        resolve: { CollapseFilterResolver: CollapseFilterResolver }
    },
    {
        path: 'obyavlenie',
        loadChildren: './pages/card-page/card-page.module#CardPageModule',
        resolve: { CollapseFilterResolver: CollapseFilterResolver }
    },
    {
        path: 'room',
        loadChildren: './pages/room-page/room-page.module#RoomPageModule',
        canActivate: [AuthGuard],
        resolve: { CollapseFilterResolver: CollapseFilterResolver }
    },
    {
        path: 'login',
        loadChildren: './pages/login-page/login-page.module#LoginPageModule',
        resolve: { CollapseFilterResolver: CollapseFilterResolver }
    },
    {
        path: 'register',
        loadChildren: './pages/register-page/register-page.module#RegisterPageModule',
        resolve: { CollapseFilterResolver: CollapseFilterResolver }
    },
    {
        path: 'information',
        loadChildren: './pages/information-page/information-page.module#InformationPageModule',
        resolve: { CollapseFilterResolver: CollapseFilterResolver }
    },
    {
        path: 'categories/:sub-category/:item-name/item',
        loadChildren: './pages/card-page/card-page.module#CardPageModule',
        resolve: { CollapseFilterResolver: CollapseFilterResolver }
    },
    // categories/:::
    { path: 'categories', component: CategoriesComponent },
    { path: 'categories/:sub-category', component: ProductItemListPageComponent },
    { path: 'categories/:sub-category/:brand', component: ProductItemListPageComponent },
    { path: 'categories/:sub-category/:brand/:model', component: ProductItemListPageComponent },
    // cities/:/categories/:::
    {
        path: 'cities/:city/categories/:sub-category/:item-name/item',
        loadChildren: './pages/card-page/card-page.module#CardPageModule',
        resolve: { CollapseFilterResolver: CollapseFilterResolver }
    },
    { path: 'cities/:city/categories/:sub-category', component: ProductItemListPageComponent },
    { path: 'cities/:city/categories/:sub-category/:brand', component: ProductItemListPageComponent },
    { path: 'cities/:city/categories/:sub-category/:brand/:model', component: ProductItemListPageComponent },
    { path: 'cities/:city/categories', redirectTo: 'categories' },
    {
        path: 'cities',
        loadChildren: './pages/cities-page/cities-page.module#CitiesPageModule',
        resolve: { CollapseFilterResolver: CollapseFilterResolver }
    },
    {
        path: 'dealers',
        loadChildren: './pages/product-item-list-dealer-page/product-item-list-dealer-page.module#ProductItemListDealerPageModule'
    },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableTracing: false,
            useHash: false,
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled'
        })
    ],
    exports: [RouterModule],
    providers: [

    ]
})
export class AppRoutingModule {
    constructor() { }
}
