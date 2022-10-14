import { MomentModule } from 'ngx-moment';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { CommentModule } from '../components/comment/comment.module';
import { HotBlockItemComponent } from '../components/hot-block-item/hot-block-item.component';
import { HotBlockComponent } from '../components/hot-block/hot-block.component';
import { NewsBlockComponent } from '../components/news-block/news-block.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewsBlockItemComponent } from '../components/news-block-item/news-block-item.component';
import { HotBlockAsideComponent } from '../components/hot-block-aside/hot-block-aside.component';
import { RouterModule } from '@angular/router';
import { SearchFilterModule } from '../components/search-filter/search-filter.module';
import { MonetizationInfoComponent } from '../../common/components/monetization-info/monetization-info.component';
import { OtherProductComponent } from '../../common/components/other-product/other-product.component';
import { OtherProductListComponent } from '../components/other-product-list/other-product-list.component';
import { PageNotFoundComponent } from '../../common/components/page-not-found/page-not-found.component';
import { PaginationModule } from '../components/pagination/pagination.module';
import { BannerComponent } from '../components/banner/banner/banner.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { SubCategoryListComponent } from '../../pages/home-page/components/sub-category-list/sub-category-list.component';
import { SubCategoryComponent } from '../../pages/home-page/components/sub-category/sub-category.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { ClickOutsideModule } from 'ng-click-outside';
import { CityDialogWindowComponent } from '../components/city-dialog-window/city-dialog-window.component';
import { HeaderComponent } from '../components/header/header.component';
import { CategoriesComponent } from '../../pages/home-page/components/categories/categories.component';
import { JsonLdComponent } from '../components/json-ld/json-ld.component';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { ProductItemComponent } from '../components/product-item/product-item.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    imports: [
        CommonModule,
        // NgxMasonryModule,
        SearchFilterModule,
        RouterModule,
        HttpClientModule,
        MomentModule,
        RecaptchaModule,
        NgbCarouselModule,
        CommentModule.forRoot(),
        PaginationModule.forRoot(),
        NgxMaskModule.forRoot(),
        NgProgressModule.withConfig({ color: 'red', spinner: false }),
        NgProgressHttpModule,
        ClickOutsideModule
    ],
    declarations: [
        NewsBlockComponent,
        NewsBlockItemComponent,
        HotBlockComponent,
        HotBlockItemComponent,
        HotBlockAsideComponent,
        BreadcrumbComponent,
        // Form controls end
        MonetizationInfoComponent,
        OtherProductComponent,
        OtherProductListComponent,
        PageNotFoundComponent,
        BannerComponent,
        SubCategoryListComponent,
        SubCategoryComponent,
        CityDialogWindowComponent,
        HeaderComponent,
        CategoriesComponent,
        JsonLdComponent,
        ErrorMessageComponent,
        ProductItemComponent
    ],
    exports: [
        // NgxMasonryModule,
        CommentModule,
        SearchFilterModule,
        HttpClientModule,
        NgProgressModule,
        MomentModule,
        PaginationModule,
        RecaptchaModule,
        NgbCarouselModule,
        ClickOutsideModule,
        NgxMaskModule,
        NewsBlockComponent,
        NewsBlockItemComponent,
        HotBlockComponent,
        HotBlockItemComponent,
        HotBlockAsideComponent,
        BreadcrumbComponent,
        // Form controls end
        MonetizationInfoComponent,
        OtherProductComponent,
        OtherProductListComponent,
        PageNotFoundComponent,
        BannerComponent,
        SubCategoryListComponent,
        SubCategoryComponent,
        CityDialogWindowComponent,
        HeaderComponent,
        CategoriesComponent,
        JsonLdComponent,
        ErrorMessageComponent,
        ProductItemComponent
    ]
})
export class SharedModule { }
