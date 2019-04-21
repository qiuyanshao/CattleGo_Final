import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  getDataSource(): Observable<any> {
    return this.http.get('http://localhost:8080/cattlego/datasources');
  }
  getSchema(array: Array<string>){
    var schema={};
    for (let i = 0; i < array.length; i++) {      
      schema[array[i]]={ title: array[i]};
    }
    return schema;
  }
}
