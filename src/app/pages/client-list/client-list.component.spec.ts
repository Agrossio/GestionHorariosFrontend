import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListComponent } from './client-list.component';
import { ClientsService } from 'src/app/services/clients.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientsIconNavbarComponent } from 'src/app/components/clients-icon-navbar/clients-icon-navbar.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ProfileIconNavbarComponent } from 'src/app/components/profile-icon-navbar/profile-icon-navbar.component';
import { ProjectsIconNavbarComponent } from 'src/app/components/projects-icon-navbar/projects-icon-navbar.component';
import { UsersIconNavbarComponent } from 'src/app/components/users-icon-navbar/users-icon-navbar.component';
import { DataService } from 'src/app/services/data.service';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientsService, DataService],
      declarations: [
        ClientListComponent,
        NavbarComponent,
        ProfileIconNavbarComponent,
        ProjectsIconNavbarComponent,
        UsersIconNavbarComponent,
        ClientsIconNavbarComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
