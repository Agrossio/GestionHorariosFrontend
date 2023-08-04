import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertsService} from 'src/app/services/alerts.service';
import {AuthService} from 'src/app/services/auth.service';
import {UsersService} from 'src/app/services/users.service';
import Swal, {SweetAlertIcon} from 'sweetalert2';
import {SocketService} from "../../../services/socket.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  passwordVisible = false;
  loginForm: FormGroup = new FormGroup({});
  dataResponse: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private swAlert: AlertsService,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      if (sessionStorage.getItem('roles')?.includes("BLOCKED")) {
        Swal.fire({
          position: 'center',
          text: 'Necesita ser aceptado por un ADMINISTRADOR',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        sessionStorage.clear();
        this.loginForm.reset();
        return;
      }

      if (sessionStorage.getItem('roles')?.includes("ADMIN")) {
        this.router.navigate(['/users']);
      } else if ((sessionStorage.getItem('roles')?.includes("MANAGEMENT")) ||
        (sessionStorage.getItem('roles')?.includes("DEVELOPER"))) {
        this.router.navigate(['/projects']);
      }
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'
          ),
        ],
      ],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const userRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.userService.loginUser(userRequest).subscribe({
        next: (res) => {
          this.userService.loggedIn = true;
          this.userService.loggedUser = res;

          Swal.fire({
            position: 'top-end',
            text: 'sesión iniciada',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
          });

          this.authService.setData(
            this.userService.loggedUser?.data.email,
            this.userService.loggedUser?.data.token,
            this.userService.loggedUser.data.roles
          );

          sessionStorage.setItem('token', this.userService.loggedUser?.data.token);
          sessionStorage.setItem('email', this.userService.loggedUser?.data.email);
          sessionStorage.setItem('roles', JSON.stringify(this.userService.loggedUser.data.roles));

          this.ngOnInit()
        },
        error: (err) => {
          this.swAlert.alert('error', 'Credenciales incorrectas. Revise los datos ingresados', false)
        },
      });
    } else {
      console.log("Alerta, salió algo mal");
      //TODO Esto no debería verse nunca, a menos que modifiquen el html desde el navegador, pero lo pide el testing
    }

  }
}
