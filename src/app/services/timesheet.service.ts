import { HttpClient, HttpParams } from '@angular/common/http';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  constructor(private http: HttpClient,) { }

  register(timeSheet: any) {
     console.log("class TimeSheetService method register ");
     return this.http.post<any>(`${environment.urlBIP}/timesheet`, timeSheet);
  }

  update(id, timeSheet: any) {
    return this.http.put<any>(`${environment.urlBIP}/timesheet/${id}`, timeSheet);
  }

  delete(id) {
    return this.http.delete<any>(`${environment.urlBIP}/timesheet/${id}`);
  }

  getAll(){
    return this.http.get<any>(`${environment.urlBIP}/timesheet`);
  }

  getById(id){
     return this.http.get<any>(`${environment.urlBIP}/timesheet/${id}`);
  }

  getByIdDate(id, date){
    return this.http.get<any>(`${environment.urlBIP}/timesheet/iddate?id=${id}&date=${date}`);
  }

  getByIdMonthYear(id, vmonth, vyear){
    return this.http.get<any>(`${environment.urlBIP}/timesheet/idmonthyear?id=${id}&month=${vmonth}&year=${vyear}`);
  }
  
  getByIdDateCount(id, date){
    return this.http.get<any>(`${environment.urlBIP}/timesheet/iddate/count?id=${id}&date=${date}`);
    //return this.http.get<any>(`${environment.urlBIP}/timesheet/iddate/count`, { params: param });
    /*return this.http.get<any>(`${environment.urlBIP}/timesheet/iddate/count`, {
      params: {
        id: id,
        idDate: idDate
      },
      observe: 'response'
    });*/
  }

 
}
