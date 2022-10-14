import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  constructor() { }

  @Input() routes?: Array<{ key: string, value: string }>;

  ngOnInit() {

  }
}
