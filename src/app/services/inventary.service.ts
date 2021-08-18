import {  HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventaryService {
  
  constructor(private http: HttpClient,) { }

  
  register(inventory: any) {
    return this.http.post<any>(`${environment.urlBIP}/inventory`, inventory);
  }

  update(id, inventory: any) {
    return this.http.put<any>(`${environment.urlBIP}/inventory/${id}`, inventory);
  }

  delete(id) {
    return this.http.delete<any>(`${environment.urlBIP}/inventory/${id}`);
  }

  getAll(){
    return this.http.get<any>(`${environment.urlBIP}/inventory`);
  }

  getById(id){
    return this.http.get<any>(`${environment.urlBIP}/inventory/${id}`);
  }

  getAllHeadQuarters(){
    return this.http.get<any>(`${environment.urlBIP}/inventory/hqs`);
  }
}
