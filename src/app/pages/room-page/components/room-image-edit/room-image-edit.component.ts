import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-image-edit',
  templateUrl: './room-image-edit.component.html',
  styles: []
})
export class RoomImageEditComponent implements OnInit {

  breadcrumbRoutes: any;
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.breadcrumbRoutes = [
      { key: 'главная', value: '/' },
      { key: 'личный кабинет', value: ['/room'] },
      { key: 'редактировать изображение', value: '/' }
    ];

    this.router.params.subscribe(params => {
      const id = params['id'];
      console.log(id);
    });
  }

}
