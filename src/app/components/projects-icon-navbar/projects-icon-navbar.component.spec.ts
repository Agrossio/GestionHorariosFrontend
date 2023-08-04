import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsIconNavbarComponent } from './projects-icon-navbar.component';

describe('ProjectsIconNavbarComponent', () => {
  let component: ProjectsIconNavbarComponent;
  let fixture: ComponentFixture<ProjectsIconNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsIconNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsIconNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
