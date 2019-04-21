import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CattleStateComponent } from './cattle-state.component';

describe('CattleStateComponent', () => {
  let component: CattleStateComponent;
  let fixture: ComponentFixture<CattleStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CattleStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CattleStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
