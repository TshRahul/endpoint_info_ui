import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoint } from '../classes/endpoint';

@Injectable({
  providedIn: 'root'
})
export class EndpointServiceService {

  constructor(private httpClient : HttpClient) {
  }

  getAllEndpoints() : Observable<any> {
      return this.httpClient.get("http://localhost:9091/api/endpoint");
  }

  addEndpoint(endpoint : Endpoint) : Observable<any> {
    return this.httpClient.post("http://localhost:9091/api/endpoint", endpoint);
  }

  updateEndpointInfo(endpoint : Endpoint) : Observable<any> {
    return this.httpClient.patch("http://localhost:9091/api/endpoint", endpoint);
  }

  updateEnvironment(id : number, env : string) : Observable<any>{
    return this.httpClient.patch("http://localhost:9091/api/endpoint/updateEnvironment/" + id, env);
  }

}
