import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/User';
import {environment} from '../classes/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient : HttpClient) {

  }

  serverUrl = environment.baseUrl;
  addUser(user : User)  : Observable<any> {
    return this.httpClient.post(this.serverUrl + "api/register", user, {observe: 'response'});
  } 
}
