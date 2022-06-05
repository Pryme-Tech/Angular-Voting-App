import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrycomComponent } from './trycom.component';

describe('TrycomComponent', () => {
  let component: TrycomComponent;
  let fixture: ComponentFixture<TrycomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrycomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrycomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
