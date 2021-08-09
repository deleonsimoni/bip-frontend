import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user$ = new BehaviorSubject(null);

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) { }


  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.urlBIP}/user/auth/login`, {email, password})
      .pipe(
        tap(response => {
          let user = this.getDecodedAccessToken(response.access_token);
          this.user$.next(user);
          
          this.setToken('pib-bubble', response.access_token);
          this.setToken('refreshToken', response.access_token);
        })
      );
  }

  fetchCurrentUser(): Observable<any> {
    return this.http.get<any>(`${environment.urlBIP}/current-user`)
      .pipe(
        tap(user => {
          this.user$.next(user);
        })
      );
  }

  logout(): void {
    this.localStorageService.removeItem('pib-bubble');
    this.localStorageService.removeItem('refreshToken');
    this.user$.next(null);
  }

  getToken(): String {
    return this.localStorageService.getItem('pib-bubble');
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  getCurrentUser(): Observable<any> {
    return this.user$.pipe(
      switchMap(user => {
        // check if we already have user data
        if (user) {
          return of(user);
        }

        const token = this.localStorageService.getItem('pib-bubble');
        // if there is token then fetch the current user
        if (token) {
          //return this.fetchCurrentUser();
          let user = this.getDecodedAccessToken(token);
          return of(user);
        }

        return of(null);
      })
    );
  }

  register(user: any) {
    return this.http.post<any>(`${environment.urlBIP}/user/register`, user);
  }

  private setToken(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }

  refreshToken(): Observable<{accessToken: string; refreshToken: string}> {
    const refreshToken = this.localStorageService.getItem('refreshToken');

    return this.http.post<{accessToken: string; refreshToken: string}>(
      `${environment.urlBIP}/refresh-token`,
      {
        refreshToken
      }).pipe(
        tap(response => {
          this.setToken('pib-bubble', response.accessToken);
          this.setToken('refreshToken', response.refreshToken);
        })
    );
  }
}
