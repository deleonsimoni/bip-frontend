import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private router: Router) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
        //navigate /delete cookies or whatever
        this.authService.logout();
        this.router.navigateByUrl(`/login`);
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const headersConfig = {
      'enctype': 'multipart/form-data'
    };

    const token = this.authService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    
    let request;

    if(req.url.includes("viacep")){
      request = req.clone();
    } else {
      request = req.clone({ setHeaders: headersConfig });
    }
    return next.handle(request).pipe(catchError(x=> this.handleAuthError(x)));
  }
}
