import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonLoginRequest } from '../models/Request/PersonLoginRequest';
import { PersonLoginResponse } from '../models/Response/PersonLoginResponse';
import { PersonResponse } from '../models/Response/PersonResponse';
import { environment } from '../../environments/environment';
import {PasswordResponse} from "../models/Response/PasswordResponse";
import { RegisterRequest } from '../models/Request/RegisterRequest';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  //It would be better to use an env var. Replace later

  private SERVERURL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  get serverUrl() {
    return this.SERVERURL;
  }


  httpOptions: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  httpOptionsWithToken(): object {
    let token: string | null = sessionStorage.getItem("token")
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  };

  getPersonByEmail(person: PersonLoginRequest): Observable<PersonLoginResponse> {
    try {
      return this.http.post<PersonLoginResponse>(`${this.SERVERURL}/auth/login`,
        person,
        this.httpOptions)
    } catch (error) {
      throw error;
    }
  }

  postPerson(person: RegisterRequest): Observable<void> {
    return this.http.post<void>(
      `${this.SERVERURL}/person`,
      person,
      this.httpOptions
    );
  }

  /* agregadoooo */
  getByEmail(mail: any): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(`${this.SERVERURL}/person/${mail}`);
  }

  getUsers(): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(
      `${this.SERVERURL}/person/?isDeleted=false`,
      this.httpOptionsWithToken());
  }

  getSolicitudes(): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(
      `${this.SERVERURL}/person/admin/by-role/BLOCKED`,
      this.httpOptionsWithToken());
  }

  acceptPerson(acceptedPerson: any) {
    return this.http.put<void>(
      `${this.SERVERURL}/person/admin/add-role`,
      acceptedPerson,
      this.httpOptionsWithToken());
  }

  delete(email: string) {
    return this.http.delete<void>(
      `${this.SERVERURL}/person/${email}`,
      this.httpOptionsWithToken());
  }

  // falta crear en el back
  adminUpdatePerson(email: string | undefined, update: any) {
    return this.http.put<PersonResponse>(`${this.SERVERURL}/person/admin/${email}`, update, this.httpOptionsWithToken());
  }

  updatePerson(email: string | undefined, update: any) {
    return this.http.put<PersonResponse>(
      `${this.SERVERURL}/person/${email}`, update, this.httpOptionsWithToken())

  }

  updatePassword(email: string | undefined, updatePass: any) {
    return this.http.put<PasswordResponse>(
      `${this.SERVERURL}/person/password/${email}`, updatePass, this.httpOptionsWithToken()
    )
  }
}
