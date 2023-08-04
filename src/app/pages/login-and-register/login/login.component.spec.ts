import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { of } from 'rxjs';
import { PersonLoginRequest } from 'src/app/models/Request/PersonLoginRequest';
import { PersonLoginResponse } from 'src/app/models/Response/PersonLoginResponse';
import { Role } from 'src/app/models/Role';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jasmine.SpyObj<UsersService>;
  let router: jasmine.SpyObj<Router>;


  beforeEach((() => {
    const spy = jasmine.createSpyObj('UsersService', ['loginUser']);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        FormBuilder,
        {
          provide: UsersService,
          useValue: spy
        },
        { provide: Router, useValue: spyRouter },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the login form', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'Abc123456!'
    });

    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should not submit invalid form data', () => {
    spyOn(window, 'alert');
    component.loginForm.setValue({
      email: '',
      password: ''
    });

    component.login();

    expect(userService.loginUser).not.toHaveBeenCalled();
  });

  it('should submit valid form data', () => {
    const mockUser : PersonLoginRequest = {
      email: 'test@example.com',
      password: 'Abc123456!'
    };
    const mockResponse: PersonLoginResponse = {
      success:true,
      message:"Éxito",
      data:{token:"Token",roles:[new Role(1,"admin")], email:"text@example.com"}
    }
    userService.loginUser.and.returnValue(of(mockResponse));

    component.loginForm.setValue(mockUser);

    component.login();

    expect(userService.loginUser).toHaveBeenCalledWith(mockUser);
    expect(router.navigate).toHaveBeenCalledWith(['/user-profile']);
    expect(userService.loggedIn).toBeTrue();
    expect(userService.loggedUser).toEqual(mockResponse);
  });
});
