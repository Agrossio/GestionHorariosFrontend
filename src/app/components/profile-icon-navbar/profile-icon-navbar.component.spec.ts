import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIconNavbarComponent } from './profile-icon-navbar.component';

describe('ProfileIconNavbarComponent', () => {
  let component: ProfileIconNavbarComponent;
  let fixture: ComponentFixture<ProfileIconNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileIconNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileIconNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
