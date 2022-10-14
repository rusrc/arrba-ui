import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../store/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-new-item-success',
  templateUrl: './add-new-item-success.component.html',
  styleUrls: ['./add-new-item-success.component.css']
})
export class AddNewItemSuccessComponent implements OnInit {

  message: Observable<any>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    // this.message = this.store.select(s => s.addNewItem.selected);
  }

}
