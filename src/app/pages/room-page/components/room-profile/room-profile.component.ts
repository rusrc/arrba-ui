import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-profile',
  templateUrl: './room-profile.component.html',
  styles: []
})
export class RoomProfileComponent implements OnInit {

  breadcrumbRoutes;

  constructor() { }

  ngOnInit() {
    this.breadcrumbRoutes = [
      { key: 'главная', value: '/' },
      { key: 'личный кабинет', value: '/' },
      { key: 'мои профиль', value: '/' }
    ];
  }

}
