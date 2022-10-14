import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-inline-filter',
  templateUrl: './select-inline-filter.component.html',
  styleUrls: ['./select-inline-filter.component.css']
})
export class SelectInlineFilterComponent implements OnInit {


  @Input() queryParams: any;
  @Input() items: { Key: string, Value: number }[];
  categoryIdSelected: number;

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(queryParams => {
      const categoryId = queryParams['categoryId'];
      if (categoryId) {
        this.categoryIdSelected = categoryId;
      }
    });
  }

  getQueryParams(categoryId: number) {
    if (categoryId === this.categoryIdSelected) {
      // TODO remove categoryId
      return { ...this.queryParams, ...{ 'categoryId': 0 } };
    } else {
      return { ...this.queryParams, ...{ 'categoryId': categoryId } };
    }
  }

  onSelect(event, categoryId) {
    this.categoryIdSelected = categoryId;
  }
}
