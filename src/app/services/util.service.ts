import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import cep from 'cep-promise'

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) {}

  public log: any;

  findCep(cependreco: any) {
    return Observable.create((observer) => {
      cep(cependreco.replace("-", "")).then((value) => {
        observer.next(value);
      }, err => {
        observer.error("Este CEP não foi localizado na base dos correios.");
      });
    });

   
  }

 
}
