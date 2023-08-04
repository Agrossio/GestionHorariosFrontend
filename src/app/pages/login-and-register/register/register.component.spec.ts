import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts.service';
import { UsersService } from 'src/app/services/users.service';
import { RegisterComponent } from './register.component';
import { PersonResponse } from 'src/app/models/Response/PersonResponse';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let usersService: jasmine.SpyObj<UsersService>;
  let alertsService: jasmine.SpyObj<AlertsService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const spyAlertService = jasmine.createSpyObj('AlertsService', ['alert']);
    const spyUserService = jasmine.createSpyObj('UsersService', [
      'registerUser',
    ]);
    const spyRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: UsersService, useValue: spyUserService },
        { provide: AlertsService, useValue: spyAlertService },
        { provide: Router, useValue: spyRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    alertsService = TestBed.inject(
      AlertsService
    ) as jasmine.SpyObj<AlertsService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form when valid', () => {
    const mockUser = {
      nombre: 'Test',
      apellido: 'Test',
      email: 'test@test.com',
      pass: 'Admin123',
      cuilCuit: 'test',
      telefono:"test",
      horas:15
    };
    usersService.registerUser.and.callFake(() => of(undefined));
    component.registerForm.setValue(mockUser);

    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['']);
    expect(alertsService.alert).toHaveBeenCalledWith(
      'success',
      'Tus datos fueron registrados exitosamente.',
      false
    );
  });

  it('should not submit form when invalid', () => {
    const mockIncorrectForm = {
      nombre: '',
      apellido: '',
      email: '',
      cuilCuit: '',
      pass: '',
      telefono:"",
      horas:""
    };
    component.registerForm.setValue(mockIncorrectForm);
    component.onSubmit();

    expect(usersService.registerUser).not.toHaveBeenCalled();
    expect(alertsService.alert).toHaveBeenCalledWith(
      'warning',
      'Formulario invalido. Por favor, revise los datos ingresados y envielos nuevamente.',
      true
    );
  });
});
