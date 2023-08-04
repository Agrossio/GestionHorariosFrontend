import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { UsersService } from 'src/app/services/users.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { RegisterRequest } from 'src/app/models/Request/RegisterRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  passwordVisible: boolean = false;
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertsService,
    private usersService: UsersService
  ) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(45)]],
      apellido: ['', [Validators.required, Validators.maxLength(45)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(45)],
      ],
      cuilCuit: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      ],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      pass: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern(
            '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,20}$'
          ),
        ],
      ],

      //TODO Falta feedback en los inputs. Password no dice bien qué necesita para ser válido. Tampoco mail (aunque este podemos darlo por obvio)
      //TODO Revisar las validaciones que usaron en el back para que sean iguales
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      const valores: RegisterRequest = {
        name: formValues.nombre,
        lastname: formValues.apellido,
        email: formValues.email,
        cuil: formValues.cuilCuit,
        tel: formValues.telefono,
        password: formValues.pass,
      };

      this.usersService.registerUser(valores).subscribe({
        next: (res) => (
          this.router.navigate(['']),
          this.alertService.alert(
            'success',
            'Tus datos fueron registrados exitosamente.',
            false
          )
        ),
        error: (err) => {
          if (err.status == 409) {
            this.alertService.alert(
              'error',
              'Ya existe un usuario con ese correo',
              false
            );
          } else {
            this.alertService.alert(
              'error',
              'Hubo un problema al procesar la solicitud',
              false
            );
          }
        },
      });
    } else {
      this.alertService.alert(
        'warning',
        'Formulario invalido. Por favor, revise los datos ingresados y envielos nuevamente.',
        true
      );
    }
  }

  sendEmail(e: Event) {
    e.preventDefault();
    // emailjs.sendForm('service_sun8y7l', 'template_jzw68wq', e.target as HTMLFormElement, 'ZLeGferjMGStfP4RA')
    //   .then((result: EmailJSResponseStatus) => {
    //   }, (error: any) => {
    //     this.alertService.alert('error', 'Hubo un problema al enviar el mail', false)
    //   });
  }
}
