import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaksByProjectComponent } from './list-taks-by-project.component';

describe('ListTaksByProjectComponent', () => {
  let component: ListTaksByProjectComponent;
  let fixture: ComponentFixture<ListTaksByProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTaksByProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTaksByProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
