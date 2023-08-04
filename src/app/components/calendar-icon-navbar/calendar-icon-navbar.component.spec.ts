import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarIconNavbarComponent } from './calendar-icon-navbar.component';

describe('CalendarIconNavbarComponent', () => {
  let component: CalendarIconNavbarComponent;
  let fixture: ComponentFixture<CalendarIconNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarIconNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarIconNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
