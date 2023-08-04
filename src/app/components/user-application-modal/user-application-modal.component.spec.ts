import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApplicationModalComponent } from './user-application-modal.component';

describe('UserApplicationModalComponent', () => {
  let component: UserApplicationModalComponent;
  let fixture: ComponentFixture<UserApplicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserApplicationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserApplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
