import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsIconNavbarComponent } from './clients-icon-navbar.component';

describe('ClientsIconNavbarComponent', () => {
  let component: ClientsIconNavbarComponent;
  let fixture: ComponentFixture<ClientsIconNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsIconNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsIconNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
