import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { ClientsIconNavbarComponent } from '../clients-icon-navbar/clients-icon-navbar.component';
import { ProfileIconNavbarComponent } from '../profile-icon-navbar/profile-icon-navbar.component';
import { ProjectsIconNavbarComponent } from '../projects-icon-navbar/projects-icon-navbar.component';
import { UsersIconNavbarComponent } from '../users-icon-navbar/users-icon-navbar.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ NavbarComponent,
        ProfileIconNavbarComponent,
        ProjectsIconNavbarComponent,
        UsersIconNavbarComponent,
        ClientsIconNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
