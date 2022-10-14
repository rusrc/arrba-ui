import { Component, OnInit, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CategoryService } from '../../common/services/category/category.service';
import { PagedList } from '../../common/components/pagination/models/pagedList';
import { MapHelpService } from '../../common/services/mapHelp/map-help.service';
import { of, Observable, Subject, pipe } from 'rxjs';
import { switchMap, map, tap, catchError, takeUntil } from 'rxjs/operators';
import { Title, makeStateKey, TransferState } from '@angular/platform-browser';
import { VehicleService } from '../../common/services/Vehicle/vehicle.service';
import { Vehicle } from '../../models/vehicle';
import { MessageService } from '../../common/services/message/message.service';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../common/services/seo/seo.service';
import { ProductItemDto } from '../../models/productItemDto';
import { ISeoDto } from '../../models/iSeo.dto';

const PAGED_LIST_ITEMS = makeStateKey('PAGED_LIST_ITEMS');
const SEO_MODEL = makeStateKey('SEO_MODEL');
const SEO_RESPONSE = makeStateKey('SEO_RESPONSE');

@Component({
  selector: 'app-product-item-list-page',
  templateUrl: './product-item-list-page.component.html'
})
export class ProductItemListPageComponent implements OnInit, OnDestroy {

  componentDestroy = new Subject();
  productItems: Vehicle[];
  page: PagedList<Vehicle>;
  breadcrumbRoutes: Array<{ key: string, value: any }> = [];

  paginationRouteValue: any[];
  paginationQueryParams: any;
  cardDisplayMode = 'horizontal';
  model$: Observable<any>;

  /** Transfer states */
  itemsTransferState: PagedList<Vehicle>;
  seoModelTransferState: any;
  noState = true;
  /* Transfer states **/

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private categoryService: CategoryService,
    private mapService: MapHelpService,
    private messageService: MessageService,
    private transferState: TransferState,
    private seoService: SeoService,
    public title: Title,
  ) { }

  ngOnInit() {
    /** Get data for query from url
     *  Take here the params for query
     *  and call the server if no transfer state */
    this.model$ = combineLatest([this.route.params, this.route.queryParams])
      .pipe(
        // TODO rewrite with startWith later
        // startWith({ vehicle: this.transferState.get(CARD_ITEM, null as Vehicle), params: {} })),
        tap(() => {
          /** Get transfer state */
          this.itemsTransferState = this.transferState.get(PAGED_LIST_ITEMS, null as PagedList<Vehicle>);
          this.seoModelTransferState = this.transferState.get(SEO_MODEL, null as any);
          this.noState = !(this.itemsTransferState && this.seoModelTransferState);
        }),
        switchMap((data) => {
          /** Get params */
          const [params, queryParams] = data;
          const cityAlias = params['city'];
          const categoryName = params['sub-category'];
          const brandName = params['brand'] || null;
          const modelName = params['model'] || null;
          const typeId = queryParams['typeId'] || null;
          const pageNumber = queryParams['pageNumber'] || 1;
          const keyValueParams = this.mapService.getKeyValueParams(queryParams);

          let routes = [...['categories'], categoryName, brandName, modelName];

          if (cityAlias) {
            routes = [...['cities', cityAlias], ...routes];
          }
          routes.unshift('/');

          this.paginationRouteValue = routes.filter(e => e);
          this.paginationQueryParams = queryParams;

          const model: ProductItemDto = {
            brandName, modelName, pageNumber, keyValueParams,
            categoryName, category: undefined,
            typeId, cityAlias
          };

          return of(model);
        }),
        switchMap(model => {
          // Get category by name;
          if (this.noState) {
            return this.categoryService
              .get(model.categoryName)
              .pipe(map(category => (model.category = category, model)));
          }
          return of(model);
        }),
        switchMap(model => {
          /** Call vehicles */
          const { cityAlias, category, brandName, modelName, pageNumber, keyValueParams } = model;

          if (this.noState) {
            return this.vehicleService
              .get(category.SuperCategID, category.ID, brandName, modelName, cityAlias, pageNumber, keyValueParams)
              .pipe(map(vehiles => {
                return { pagedItems: vehiles, seoModel: model };
              }),
                catchError(error => (this.messageService.throwError(error), of(error)))
              );
          }
          return of({ pagedItems: this.itemsTransferState, seoModel: this.seoModelTransferState });
        })
      );

    this.model$
      .pipe(
        switchMap(data => {
          const seoDataState = this.transferState.get(SEO_RESPONSE, null as ISeoDto);
          return seoDataState
            ? of({ seoData: seoDataState, ...data })
            : this.seoService.getSeoTitle(data.seoModel).pipe(
              map(seoData => ({ seoData, ...data }))
            );
        }),
        takeUntil(this.componentDestroy)
      ).subscribe((data: { seoData: any, pagedItems: any, seoModel: any }) => {
        const { pagedItems, seoModel, seoData } = data;

        if (seoData) {
          this.seo(seoData.title);
          this.breadcrumbs(seoData);
          this.removeTransferStateTitleIfClient();
          this.setTransferStateTitleIfClient(seoData.title);
        }

        if (pagedItems && seoModel) {
          this.messageService.clearError();

          this.page = pagedItems;
          this.productItems = pagedItems.Items;

          this.removeTransferStateIfClient();
          this.setItemsForTransferStateIfServer(pagedItems);
          this.setSeoModelForTransferStateIfServer(seoModel);
        } else {
          this.page = undefined;
          this.productItems = [];
        }
      });
  }

  onChange(event, mode) {
    event = event;
    this.cardDisplayMode = mode;
  }

  ngOnDestroy() {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  private removeTransferStateTitleIfClient() {
    if (isPlatformBrowser(this.platformId)) {
      this.transferState.remove(SEO_RESPONSE);
    }
  }
  private setTransferStateTitleIfClient(title: string) {
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(SEO_RESPONSE, title);
    }
  }
  private removeTransferStateIfClient() {
    if (isPlatformBrowser(this.platformId)) {
      this.transferState.remove(PAGED_LIST_ITEMS);
      this.transferState.remove(SEO_MODEL);
    }
  }

  private setItemsForTransferStateIfServer(pagedItems: PagedList<Vehicle>) {
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(PAGED_LIST_ITEMS, pagedItems);
    }
  }

  private setSeoModelForTransferStateIfServer(model: any) {
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(SEO_MODEL, model);
    }
  }

  private seo(model: any) {
    this.seoService.productItemListPage(model);
  }

  private breadcrumbs(model: ISeoDto) {
    this.breadcrumbRoutes = [];
    if (model.breadcrumbs) {
      model.breadcrumbs
        .map(b => ({ key: b.Key, value: b.Value }))
        .forEach(breadcrumb => {
          this.breadcrumbRoutes.push(breadcrumb);
        });
    }
  }

}
