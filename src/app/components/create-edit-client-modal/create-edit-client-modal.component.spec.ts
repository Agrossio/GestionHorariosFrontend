import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditClientModalComponent } from './create-edit-client-modal.component';

describe('CreateEditClientModalComponent', () => {
  let component: CreateEditClientModalComponent;
  let fixture: ComponentFixture<CreateEditClientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditClientModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditClientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
