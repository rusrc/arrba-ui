import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_HOST } from '../../constants/constants';
import { JwtService } from '../jwt/jwt.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const token = 'token';
const guestToken = 'guestToken';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private jwtService: JwtService) { }

  get isAuthorized() {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(token) && !this.isTokenExpired;
    }
    return false;
  }

  get isGuest() {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(guestToken);
    }
    return '';
  }

  login(user: { email: string, password: string }) {
    const url = `${ROOT_HOST}/api/token`;
    return this.http.post(url, user, {
      observe: 'response'
    });
  }

  loginAsGuest(grecaptchaToke: string) {
    const url = `${ROOT_HOST}/api/token/grecaptcha`;
    return this.http.post(url, grecaptchaToke, {
      observe: 'response'
    });
  }

  get token() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(token);
    }
    return '';
  }

  get guestToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(guestToken);
    }
    return '';
  }

  get isTokenExpired() {
    return this.jwtService.isTokenExpired(this.token);
  }

  get guestTokenExpired() {
    return this.jwtService.isTokenExpired(this.guestToken);
  }

  saveToken(tokenValue: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.deleteTokens();
      localStorage.setItem(token, tokenValue);
    }
  }

  saveGuestToken(tokenValue: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.deleteTokens();
      localStorage.setItem(guestToken, tokenValue);
    }
  }

  deleteTokens() {
    this.deleteToken();
    this.deleteGuestToket();
    return this;
  }

  deleteToken() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem(token);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }

  deleteGuestToket() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem(guestToken);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
}
