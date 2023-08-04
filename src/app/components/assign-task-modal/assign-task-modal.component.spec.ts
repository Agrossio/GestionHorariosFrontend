import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTaskModalComponent } from './assign-task-modal.component';

describe('AssignTaskModalComponent', () => {
  let component: AssignTaskModalComponent;
  let fixture: ComponentFixture<AssignTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTaskModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
