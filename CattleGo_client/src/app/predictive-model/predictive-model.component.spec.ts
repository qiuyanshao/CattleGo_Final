import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictiveModelComponent } from './predictive-model.component';

describe('PredictiveModelComponent', () => {
  let component: PredictiveModelComponent;
  let fixture: ComponentFixture<PredictiveModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictiveModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictiveModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
