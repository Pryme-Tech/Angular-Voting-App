import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingvotingComponent } from './ongoingvoting.component';

describe('OngoingvotingComponent', () => {
  let component: OngoingvotingComponent;
  let fixture: ComponentFixture<OngoingvotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingvotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingvotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
