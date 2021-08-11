import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,) { }

  register(client: any) {
    return this.http.post<any>(`${environment.urlBIP}/client/register`, client);
  }

  update(client: any) {
    return this.http.put<any>(`${environment.urlBIP}/client/register`, client);
  }

  delete(id) {
    return this.http.delete<any>(`${environment.urlBIP}/client/${id}`);
  }

  getAll(){
    return this.http.get<any>(`${environment.urlBIP}/client/register`);
  }

  getById(id){
    return this.http.get<any>(`${environment.urlBIP}/client/${id}`);
  }

  getAllHeadQuarters(){
    return this.http.get<any>(`${environment.urlBIP}/client/hqs`);
  }
}
