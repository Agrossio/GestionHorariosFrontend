import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersIconNavbarComponent } from './users-icon-navbar.component';

describe('UsersIconNavbarComponent', () => {
  let component: UsersIconNavbarComponent;
  let fixture: ComponentFixture<UsersIconNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersIconNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersIconNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
