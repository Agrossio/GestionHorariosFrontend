import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptRejectBoxComponent } from './accept-reject-box.component';

describe('AcceptRejectBoxComponent', () => {
  let component: AcceptRejectBoxComponent;
  let fixture: ComponentFixture<AcceptRejectBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptRejectBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptRejectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
