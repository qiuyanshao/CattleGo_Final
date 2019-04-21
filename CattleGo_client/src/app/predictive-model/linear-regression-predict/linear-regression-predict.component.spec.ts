import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearRegressionPredictComponent } from './linear-regression-predict.component';

describe('LinearRegressionPredictComponent', () => {
  let component: LinearRegressionPredictComponent;
  let fixture: ComponentFixture<LinearRegressionPredictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinearRegressionPredictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearRegressionPredictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
