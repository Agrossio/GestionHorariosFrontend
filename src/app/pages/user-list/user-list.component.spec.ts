import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';
import { ProfileIconNavbarComponent } from 'src/app/components/profile-icon-navbar/profile-icon-navbar.component';
import { ProjectsIconNavbarComponent } from 'src/app/components/projects-icon-navbar/projects-icon-navbar.component';
import { UsersIconNavbarComponent } from 'src/app/components/users-icon-navbar/users-icon-navbar.component';
import { ClientsIconNavbarComponent } from 'src/app/components/clients-icon-navbar/clients-icon-navbar.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService, DataService],
      declarations: [
        UserListComponent,
        NavbarComponent,
        ProfileIconNavbarComponent,
        ProjectsIconNavbarComponent,
        UsersIconNavbarComponent,
        ClientsIconNavbarComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
