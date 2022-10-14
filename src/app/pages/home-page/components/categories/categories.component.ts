import { Component, OnInit } from '@angular/core';
import { SuperCategoryService } from '../../../../common/services/SuperCategory/super-category.service';
import { SuperCategory } from '../../../../models/superCategory';
import { combineLatest } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {

  superCategories: SuperCategory[];
  constructor(
    private route: ActivatedRoute,
    private superCategoryService: SuperCategoryService
  ) { }

  ngOnInit() {

    combineLatest(this.route.queryParams, this.superCategoryService.state$)
      .subscribe(data => {

        const [queryParams, superCategories] = data;
        const superCategoryId = +queryParams['superCategoryId'];

        if (superCategoryId) {
          this.superCategories = superCategories.filter(sc => sc.ID === superCategoryId);
        } else {
          this.superCategories = superCategories;
        }

      });
  }

}
