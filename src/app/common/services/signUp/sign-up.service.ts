import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_HOST } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  register(signUpData: {
    'grecaptchaToken': 'string',
    'email': 'string',
    'Password': 'string',
    'ruleAgree': boolean
  }) {
    const url = `${ROOT_HOST}/api/signup`;
    return this.http.post(url, signUpData, {
      observe: 'response'
    });
  }

}
