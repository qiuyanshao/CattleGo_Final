import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../service/survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-surveylist',
  templateUrl: './surveylist.component.html',
  styleUrls: ['./surveylist.component.css']
})
export class SurveylistComponent implements OnInit {
  public surveys;
  public id: number;
  pageTitle = 'Survey Summary';

  constructor(private _surveyService: SurveyService, private _router: Router) { }

  ngOnInit() {
    this._surveyService.getSurveyList().subscribe(
      (surveys) =>{
        console.log('surveys list', surveys);
        this.surveys = surveys;
      }, (err)=>{
        console.error(err);
      });
    
  }

  onBack(): void {
    this._router.navigate(['/newsurvey']);
  }

};
