import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailInListComponent } from './project-detail-in-list.component';

describe('ProjectDetailInListComponent', () => {
  let component: ProjectDetailInListComponent;
  let fixture: ComponentFixture<ProjectDetailInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailInListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
