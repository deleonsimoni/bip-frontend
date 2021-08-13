import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  countEmployees() {
    return this.http.get<any>(`${environment.urlBIP}/user`);
  }

  countClients() {
    return this.http.get<any>(`${environment.urlBIP}/client`);
  }


}
