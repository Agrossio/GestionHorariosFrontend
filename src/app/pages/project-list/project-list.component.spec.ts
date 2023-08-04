import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { ProjectsService } from 'src/app/services/projects.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientsIconNavbarComponent } from 'src/app/components/clients-icon-navbar/clients-icon-navbar.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ProfileIconNavbarComponent } from 'src/app/components/profile-icon-navbar/profile-icon-navbar.component';
import { ProjectsIconNavbarComponent } from 'src/app/components/projects-icon-navbar/projects-icon-navbar.component';
import { UsersIconNavbarComponent } from 'src/app/components/users-icon-navbar/users-icon-navbar.component';
import { DataService } from 'src/app/services/data.service';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [HttpClientTestingModule],
      providers: [ProjectsService, DataService],
      declarations: [
        ProjectListComponent,
        NavbarComponent,
        ProfileIconNavbarComponent,
        ProjectsIconNavbarComponent,
        UsersIconNavbarComponent,
        ClientsIconNavbarComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
