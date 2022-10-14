import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotFoundService } from '../not-found/not-found.service';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _error: Subject<ErrorException> = new Subject<ErrorException>();

  constructor(private notFoundService: NotFoundService) {
    this.error$.subscribe((error: ErrorException) => {
      if (error) {
        console.error('MessageService: ', error);
        if (error.response && error.response.status === 404) {
          this.notFoundService.setStatus(404, error.message);
        } else
        if (error.response && error.response.status === 500) {
          this.notFoundService.setStatus(500, error.message);
        }
      }
    });
  }

  public get error$() {
    return this._error.asObservable();
  }

  throwError(error: string | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      this._error.next(new ErrorException(error.message, error));
    } else if (typeof error === 'string') {
      this._error.next(new ErrorException(error));
    } else {
      this._error.next(new ErrorException(error));
    }
  }

  clearError() {
    this._error.next(undefined);
  }
}

export class ErrorException extends Error {
  constructor(message?: string, response?: HttpErrorResponse) {
    super(message);
    this.response = response;
  }
  response: HttpErrorResponse;
}
