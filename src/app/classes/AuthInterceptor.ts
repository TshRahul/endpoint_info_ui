import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private cookie : CookieService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    req = req.clone({
      setHeaders: {
        Authorization :  'Bearer ' + this.cookie.get('jwt'),
        "Content-Type" : 'application/json'
      },
    });
    return next.handle(req);
  }
}