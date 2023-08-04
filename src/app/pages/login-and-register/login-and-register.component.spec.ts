import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAndRegisterComponent } from './login-and-register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginAndRegisterComponent', () => {
  let component: LoginAndRegisterComponent;
  let fixture: ComponentFixture<LoginAndRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ LoginAndRegisterComponent, LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAndRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
