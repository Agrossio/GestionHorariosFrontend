import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedAlertsModalComponent } from './reported-alerts-modal.component';

describe('ReportedAlertsModalComponent', () => {
  let component: ReportedAlertsModalComponent;
  let fixture: ComponentFixture<ReportedAlertsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportedAlertsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedAlertsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
