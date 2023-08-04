import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProjectModalComponent } from './create-edit-project-modal.component';

describe('CreateEditProjectModalComponent', () => {
  let component: CreateEditProjectModalComponent;
  let fixture: ComponentFixture<CreateEditProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditProjectModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
