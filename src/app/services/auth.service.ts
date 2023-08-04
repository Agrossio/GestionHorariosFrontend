import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { DataService } from './data.service';
import {SocketService} from "./socket.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email:string='';
  token:string='';
  _roles:any=[];
  constructor(private router: Router,
              private dataService: DataService,
              private socket: SocketService) { }
  setData(email:string, token:string, roles:any) {
    this.email = email;
    this.token = token;
    this._roles = roles;
  }
  setRoles(roles:any) {
    this._roles = roles;
  }
  getRoles() {
    return this._roles;
  }
  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    if(sessionStorage.getItem('token')) {

      const rolesLS = sessionStorage.getItem('roles');
      this.setRoles(rolesLS)
      if (this.getRoles().includes(route.data['role'][0]) || this.getRoles().includes(route.data['role'][1]) || this.getRoles().includes(route.data['role'][2])) {
        return true;
      } else {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
