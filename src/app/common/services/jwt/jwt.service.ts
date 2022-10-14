import { Injectable } from '@angular/core';

interface IJwtToken {
  exp: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  public isTokenExpired(token: string) {
    if (!token) {
      return true;
    }
    const jwtToken: IJwtToken = this.parseJwt(token);
    const expired = new Date(jwtToken.exp * 1000).getTime();
    const now = new Date().getTime();
    return now > expired;
  }

  public parseJwt(token: string) {
    if (!token) {
      throw Error('token is empty');
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
