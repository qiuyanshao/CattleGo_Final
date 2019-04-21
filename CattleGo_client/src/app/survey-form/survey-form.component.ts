import { Component, OnInit } from '@angular/core';
import { Survey } from '../service/survey';
import { Router } from '@angular/router';
import { SurveyService } from '../service/survey.service';
import {StarRatingModule} from 'angular-star-rating';


@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  public survey: Survey;
  public rating: any;
  

  constructor(private _surveyService: SurveyService, private _router: Router) { }

  ngOnInit() {
    this.survey = this._surveyService.getter();
    console.log('rating: ', this.rating);

  }
  processForm() {
    if(this.survey.id == undefined) {
      this._surveyService.createSurvey(this.survey).subscribe((survey) => {
        console.log('survey', survey);
        this._router.navigate(['surveys']);
      }, (err) => {
        console.error(err);
        console.error('wrong with create survey');
      })
    }else{
      this._surveyService.updateSurvey(this.survey).subscribe((survey) => {
        console.log(survey);
        this._router.navigate(['surveys']);
      }, (err) => {
        console.error(err);
      console.error("wrong with update");
      })
    }
  }

}
