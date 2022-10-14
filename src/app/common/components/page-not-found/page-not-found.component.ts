import { Component, OnInit } from '@angular/core';
import { NotFoundService } from '../../services/not-found/not-found.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {

  public status: { code: number; message: string };

  constructor(private _notFoundService: NotFoundService) { }

  ngOnInit(): void {
    this._notFoundService.setStatus(404, 'Not Found');
  }

}
