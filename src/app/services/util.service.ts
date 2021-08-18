import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import cep from 'cep-promise'

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) {}

  public log: any;

  findCep(cependreco: any) {
    return this.http
          .get(`https://viacep.com.br/ws/${cependreco.replace("-", "")}/json/`);
  }

  pad(num, size:number): string {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

}
