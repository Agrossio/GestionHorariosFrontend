import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSprintModalComponent } from './create-edit-sprint-modal.component';

describe('CreateEditSprintModalComponent', () => {
  let component: CreateEditSprintModalComponent;
  let fixture: ComponentFixture<CreateEditSprintModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditSprintModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditSprintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
