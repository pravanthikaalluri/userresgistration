import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLConstants } from '../constants/url.contants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }
  getUserRegistration() {
    return this.httpClient.get(URLConstants.USER_REGISTRATION_API);
  }
  getUserProfileList() {
    return this.httpClient.get(URLConstants.USER_PROFILE_API);
  }
  getAuthenticationStatus(): boolean {
    if (sessionStorage.getItem('registrationStatus') === 'true') {
      return true
    }
    return false;
  }
}
