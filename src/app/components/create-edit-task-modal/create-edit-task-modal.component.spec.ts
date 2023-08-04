import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTaskModalComponent } from './create-edit-task-modal.component';

describe('CreateEditTaskModalComponent', () => {
  let component: CreateEditTaskModalComponent;
  let fixture: ComponentFixture<CreateEditTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditTaskModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
