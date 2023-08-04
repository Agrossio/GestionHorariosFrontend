import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonLoginRequest } from '../models/Request/PersonLoginRequest';
import { PersonLoginResponse } from '../models/Response/PersonLoginResponse';
import { DataService } from './data.service';
import { PersonData } from '../models/Response/PersonResponse';
import { RegisterRequest } from '../models/Request/RegisterRequest';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private dataService: DataService) {}
  loggedIn: boolean = false;
  loggedUser: PersonLoginResponse | undefined;
  users: PersonData[] = [];
  loginUser(user: PersonLoginRequest): Observable<PersonLoginResponse> {
    return this.dataService.getPersonByEmail(user)
  }

  registerUser(user: RegisterRequest): Observable<void> {
    return this.dataService.postPerson(user);
  }
  logoutUser(): void {
    this.loggedIn = false;
    this.loggedUser = undefined;
  }
  getUsers(): any[] {
    return ["Test" ]/*  this.users; */
  }
  getSolicitudes(): any[] {
    return ["Test" ]/* this.solicitudes; */
  }
}
