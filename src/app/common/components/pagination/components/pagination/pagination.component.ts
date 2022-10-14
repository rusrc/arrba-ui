import { Component, Input } from '@angular/core';
import { PagedList } from '../../../../../common/components/pagination/models/pagedList';
import { MAX_COUNT_OF_PAGES, MIN_COUNT_OF_PAGES } from '../../../../../common/constants/constants';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {

  @Input() page: PagedList<any>;
  @Input() routerLinkValue: any[];
  @Input() queryParams: any;

  generateArray(): number[] {
    const arr: number[] = [];
    for (let i = this.firstPageNumber; i <= this.lastPageNumber; i++) {
      arr.push(i);
    }

    return arr;
  }

  get CountRows(): number {
    return this.page.PageSize;
  }

  get isCenter(): boolean {
    return this.page.PageCount - this.page.PageNumber > MIN_COUNT_OF_PAGES && this.page.PageNumber > 5;
  }

  get isLast(): boolean {
    return this.page.PageCount - this.page.PageNumber <= MIN_COUNT_OF_PAGES;
  }

  get firstPageNumber(): number {
    const pageNumber =
      this.isCenter ? this.page.PageNumber - MIN_COUNT_OF_PAGES : (this.isLast) ? this.page.PageCount - MAX_COUNT_OF_PAGES : 1;

    return this.page.PageCount <= MAX_COUNT_OF_PAGES ? 1 : pageNumber;
  }

  get lastPageNumber(): number {
    const pageNumber = (this.isCenter) ? this.page.PageNumber + 4 : (this.isLast) ? this.page.PageCount : MAX_COUNT_OF_PAGES;

    return this.page.PageCount <= MAX_COUNT_OF_PAGES ? this.page.PageCount : pageNumber;
  }

  getQueryParams(pageNumber: number) {
    return { ...this.queryParams, ...{ 'pageNumber': pageNumber } };
  }
}
