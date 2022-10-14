import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService, ErrorException } from '../../services/message/message.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styles: []
})
export class ErrorMessageComponent implements OnInit, OnDestroy {

  name: string;
  error: ErrorException;
  isDevelop: boolean;
  subscription: Subscription;

  constructor(private messageService: MessageService, private title: Title) {
    this.isDevelop = !environment.production;
  }

  ngOnInit() {
    this.subscription = this.messageService.error$.subscribe(error => {
      if (error) {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              this.name = 'По этому запросу нет данных';
              break;
          }
        }

        this.error = error;

        this.title.setTitle(this.name || this.error.name);
      } else {
        this.name = '';
        this.error = error;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
