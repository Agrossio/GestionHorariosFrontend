import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailUserComponent } from './task-detail-user.component';

describe('TaskDetailUserComponent', () => {
  let component: TaskDetailUserComponent;
  let fixture: ComponentFixture<TaskDetailUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDetailUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
