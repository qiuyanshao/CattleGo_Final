import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { PredictiveModelComponent } from './predictive-model/predictive-model.component';
import { HomeComponent } from './home/home.component';
import { CattleMapComponent } from './cattle-map/cattle-map.component';
import { CattleStateComponent } from './cattle-state/cattle-state.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './data-table/data-table.component';

import { MultiSeriesComponent } from './predictive-model/multi-series-line-chart/multi-series-line-chart.component';


import { MatMenuModule, MatSidenavModule } from '@angular/material';
import { LinearRegressionPredictComponent } from './predictive-model/linear-regression-predict/linear-regression-predict.component';

import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveylistComponent } from './surveylist/surveylist.component';
import { StarRatingModule } from 'angular-star-rating';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    PredictiveModelComponent,
    HomeComponent,
    CattleMapComponent,
    CattleStateComponent,
    DataTableComponent,
    MultiSeriesComponent,
    LinearRegressionPredictComponent,
    SurveyFormComponent,
    SurveylistComponent,
  ],
  imports: [
    FormsModule,
    StarRatingModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2SmartTableModule,
    NgbModule.forRoot(),
    MatSidenavModule,
    RouterModule,
    MatMenuModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
