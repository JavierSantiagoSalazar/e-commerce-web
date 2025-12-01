import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.startsWith(environment.apiUrl) || request.url.startsWith(environment.inventoryApiUrl)) {
      const headers: any = {
        'Accept': 'application/vnd.api+json',
        'x-api-key': environment.apiKey
      };

      if (request.body && (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH')) {
        headers['Content-Type'] = 'application/vnd.api+json';
      }

      const modifiedRequest = request.clone({
        setHeaders: headers
      });
      return next.handle(modifiedRequest);
    }

    return next.handle(request);
  }
}
