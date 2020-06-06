import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authenticate } from '../classes/Authenticate';
import { Observable } from 'rxjs';
import {environment} from '../classes/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private httpClient : HttpClient) { }
  serverUrl = environment.baseUrl;

  authenticateUser(auth : Authenticate): Observable<any> {
    return this.httpClient.post(this.serverUrl + "api/authenticate", auth, { observe: 'response' });
  }
}
