import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(private router: Router) {}

  alert(icon: SweetAlertIcon, text: string, show: boolean) {
    return Swal.fire({
      icon: icon,
      iconColor: '#000000',
      html: text,
      showCancelButton: show,
    });
  }
  tokenTimeOut() {
    Swal.fire({
      icon: 'error',
      iconColor: '#000000',
      html: "Sesión caducada. Redirigiendo al login...",
    });
    Swal.showLoading();
    setTimeout(() => {
      Swal.close();
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('roles');
      sessionStorage.removeItem('email');
      this.router.navigate(['/']);
    }, 3000);
  }
}
