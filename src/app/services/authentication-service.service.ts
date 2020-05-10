import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Authenticate } from '../classes/Authenticate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private httpClient : HttpClient) { }

  authenticateUser(auth : Authenticate): Observable<any> {
    return this.httpClient.post("http://localhost:9091/api/authenticate", auth, { observe: 'response' });
  }
}
