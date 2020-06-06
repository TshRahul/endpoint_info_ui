import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoint } from '../classes/endpoint';
import {environment} from '../classes/environment';

@Injectable({
  providedIn: 'root'
})
export class EndpointServiceService {

  constructor(private httpClient : HttpClient) {
  }
  serverUrl = environment.baseUrl;
  
  getAllEndpoints() : Observable<any> {
      return this.httpClient.get(this.serverUrl + "api/endpoint" , { observe: 'response' });
  }

  addEndpoint(endpoint : Endpoint) : Observable<any> {
    return this.httpClient.post(this.serverUrl + "api/endpoint", endpoint, { observe: 'response' });
  }

  updateEndpointInfo(endpoint : Endpoint) : Observable<any> {
    return this.httpClient.patch(this.serverUrl + "api/endpoint", endpoint);
  }

  updateEnvironment(id : number, env : string) : Observable<any>{
    return this.httpClient.patch(this.serverUrl + "api/endpoint/updateEnvironment/" + id, env);
  }

  updateIsBad(id : number, isBad : boolean) : Observable<any> {
    return this.httpClient.patch(this.serverUrl + "api/endpoint/isBad/" + id, isBad);
  }

  deleteEndpoint(id : number) : Observable<any> {
    return this.httpClient.delete(this.serverUrl + "api/endpoint/" + id, { observe: 'response' });
  }

}
