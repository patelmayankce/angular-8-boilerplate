import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@app/core/local-storage.service';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const credentialsKey = 'credentials';

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(
    response: HttpResponse<any>
  ): Observable<HttpEvent<any>> {
    if (response.status === 401) {
      this.localStorageService.clearItem(credentialsKey);
      this.router.navigate(['/login'], {
        replaceUrl: true
      });
    }

    if (!environment.production) {
      // Do something with the error
      console.error('Request error', response);
    }
    throw response;
  }
}
