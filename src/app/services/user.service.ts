import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,) { }

  register(user: any) {
    return this.http.post<any>(`${environment.urlBIP}/user`, user);
  }

  update(user: any) {
    return this.http.put<any>(`${environment.urlBIP}/user/register`, user);
  }

  delete(id) {
    return this.http.delete<any>(`${environment.urlBIP}/user/${id}`);
  }

  getAll(){
    return this.http.get<any>(`${environment.urlBIP}/user`);
  }

  getById(id){
    return this.http.get<any>(`${environment.urlBIP}/user/${id}`);
  }

}
