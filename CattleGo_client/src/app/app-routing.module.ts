import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PredictiveModelComponent } from './predictive-model/predictive-model.component';
import { CattleMapComponent } from './cattle-map/cattle-map.component';
import { CattleStateComponent } from './cattle-state/cattle-state.component';
import { DataTableComponent } from './data-table/data-table.component';

import { MultiSeriesComponent } from './predictive-model/multi-series-line-chart/multi-series-line-chart.component';
import { LinearRegressionPredictComponent } from './predictive-model/linear-regression-predict/linear-regression-predict.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveylistComponent } from './surveylist/surveylist.component';



const routes: Routes = [
  {
    path: 'predictive-model', 
    component: PredictiveModelComponent,
    children:[
      {path: 'multi-series', component: MultiSeriesComponent},
      {path: 'linear-regression', component: LinearRegressionPredictComponent},
      {path: '', component: MultiSeriesComponent },
    ]
  },
  {path: 'cattle-map', component: CattleMapComponent},
  {path: 'data-table', component: DataTableComponent},
  {path: 'cattle-state', component: CattleStateComponent},
  {path: 'newsurvey', component: SurveyFormComponent},
  {path: 'surveys', component: SurveylistComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routingComponents = [PredictiveModelComponent, CattleMapComponent, DataTableComponent, HomeComponent, LineChartComponent]
