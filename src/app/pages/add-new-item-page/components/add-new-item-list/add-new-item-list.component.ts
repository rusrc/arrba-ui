import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/category';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../../common/services/category/category.service';

@Component({
  selector: 'app-add-new-item-list',
  templateUrl: './add-new-item-list.component.html',
  styleUrls: ['./add-new-item-list.component.css']
})
export class AddNewItemListComponent implements OnInit {

  categories$: Observable<Category[]>;
  breadcrumbRoutes: Array<{ key: string, value: any }> = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
    this.breadcrumbs();
  }

  breadcrumbs() {
    this.breadcrumbRoutes.push({ key: 'главная', value: '/' });
    this.breadcrumbRoutes.push({ key: 'выберите категорию', value: '/' });
  }

  sort(items: Category[]) {
    return items.sort((prev, next) => {
      if (prev.Name < next.Name) { return -1; }
      if (prev.Name > next.Name) { return 1; }
      return 0;
    });
  }
}
