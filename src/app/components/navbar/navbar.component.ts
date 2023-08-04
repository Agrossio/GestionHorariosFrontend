import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/app/services/alerts.service';
import {Router} from "@angular/router";
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // showButton : boolean = true;

  rolAdmin: boolean = false

  constructor(private alertsService: AlertsService,
              private router: Router,
              private userService: UsersService,
              private authService: AuthService,
              private socket: SocketService) { }

  ngOnInit () {

    /* this.userService.loggedUser?.role.roleName */

    if(this.authService._roles.includes("ADMIN")){
      this.rolAdmin = true
    }

}

logOut() {
  this.alertsService.alert('warning', "¿Está seguro que quiere salir?", true).then((result) => {
    if (result.isConfirmed) {
      this.socket.wsDisconnect();
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('roles');
      sessionStorage.removeItem('email');
      this.router.navigate(['/'])
     }
  })
}

}
