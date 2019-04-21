
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Survey } from './survey';
const httpOptions = {
  headers:new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  public headers = new Headers({'Content-Type':'application/json'});
  public survey = new Survey();

  
  constructor(private http:HttpClient) { }

  getSurveyList(): Observable<any> {
    return this.http.get('http://localhost:8080/cattlego/surveys');
  }
  updateSurvey(survey: Survey){
    const headers = new HttpHeaders().set('Content-Type','text/plain;charset=utf-8');
    return this.http.put('http://localhost:8080/cattlego/survey', survey);
  }
  createSurvey(survey: Survey){
    const headers = new HttpHeaders().set('Content-Type','text/plain;charset=utf-8');
    return this.http.post('http://localhost:8080/cattlego/survey', survey);
  }

  setter(survey: Survey){
    this.survey = survey;
  }
  getter(){
    return this.survey;
  }

}
