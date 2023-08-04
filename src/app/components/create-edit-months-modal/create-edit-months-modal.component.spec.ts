import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditMonthsModalComponent } from './create-edit-months-modal.component';

describe('CreateEditMonthsModalComponent', () => {
  let component: CreateEditMonthsModalComponent;
  let fixture: ComponentFixture<CreateEditMonthsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditMonthsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditMonthsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
