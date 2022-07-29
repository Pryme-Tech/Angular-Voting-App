import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatevoterComponent } from './authenticatevoter.component';

describe('AuthenticatevoterComponent', () => {
  let component: AuthenticatevoterComponent;
  let fixture: ComponentFixture<AuthenticatevoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatevoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatevoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
