import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAdminViewComponent } from './project-admin-view.component';

describe('ProjectAdminViewComponent', () => {
  let component: ProjectAdminViewComponent;
  let fixture: ComponentFixture<ProjectAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectAdminViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
