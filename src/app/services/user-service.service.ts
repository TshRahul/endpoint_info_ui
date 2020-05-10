import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient : HttpClient) {
  }
  addUser(user : User)  : Observable<any> {
    return this.httpClient.post("http://localhost:9091/api/register", user, {observe: 'response'});
  }
}
