import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageHeaderComponent } from './list-page-header.component';

describe('ListPageHeaderComponent', () => {
  let component: ListPageHeaderComponent;
  let fixture: ComponentFixture<ListPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPageHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
