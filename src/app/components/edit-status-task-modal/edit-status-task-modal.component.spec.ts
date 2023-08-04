import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatusTaskModalComponent } from './edit-status-task-modal.component';

describe('EditStatusTaskModalComponent', () => {
  let component: EditStatusTaskModalComponent;
  let fixture: ComponentFixture<EditStatusTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStatusTaskModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStatusTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
