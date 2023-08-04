import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditUserModalComponent } from './create-edit-user-modal.component';

describe('CreateEditUserModalComponent', () => {
  let component: CreateEditUserModalComponent;
  let fixture: ComponentFixture<CreateEditUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditUserModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
