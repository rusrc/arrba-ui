import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SuperCategoryService } from '../../../../common/services/SuperCategory/super-category.service';
import { SuperCategsAndCategsWithBrand } from '../../models/SuperCategsAndCategsWithBrand';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const SUPER_CATEGORIES_GROUP_BY_BRANDS = makeStateKey('SUPER_CATEGORIES_GROUP_BY_BRANDS');

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent implements OnInit {

  items: SuperCategsAndCategsWithBrand[];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private superCategoryService: SuperCategoryService,
    private transferState: TransferState
  ) { }

  ngOnInit() {

    const itemsFromTransferState = this.transferState.get(SUPER_CATEGORIES_GROUP_BY_BRANDS, null as SuperCategsAndCategsWithBrand[]);

    if (itemsFromTransferState) {
      this.items = itemsFromTransferState;
      if (isPlatformBrowser(this.platformId)) {
        this.transferState.remove(SUPER_CATEGORIES_GROUP_BY_BRANDS);
      }
    } else {
      this.route.params.pipe(
        switchMap(params => {
          const cityAlias = params['city'];
          let list: Observable<SuperCategsAndCategsWithBrand[]>;

          if (cityAlias) {
            list = this.superCategoryService.GetSuperCategsAndCategsWithBrandList(cityAlias);
          } else {
            list = this.superCategoryService.GetSuperCategsAndCategsWithBrandList();
          }

          return list.pipe(map(data => data));
        })
      ).subscribe(
        items => {
          this.items = items;
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(SUPER_CATEGORIES_GROUP_BY_BRANDS, items);
          }
        },
        error => console.error(error));
    }
  }
}
