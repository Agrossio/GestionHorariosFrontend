import {Injectable, OnInit} from '@angular/core';
import {ClientData, ClientResponse} from "../models/Response/ClientResponse";
import {map, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ClientRequest} from "../models/Request/ClientRequest";
import {environment} from "../../environment.prod";

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private SERVER_URL = environment.apiUrl;
  httpOptionsWithToken(): object {
    let token: string | null = sessionStorage.getItem("token")
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  };
  constructor(private http: HttpClient) {  }
  getAllClients() {
    try {
      return this.http.get<any>(`${this.SERVER_URL}/client`, this.httpOptionsWithToken())
       }
     catch (error) {
      throw error;
    }
  }
  getClientById(clientId: number){
    try {
      return this.http.get<any>(`${this.SERVER_URL}/client/${clientId}`, this.httpOptionsWithToken())
    }
    catch (error) {
      throw error;
    }
  }
  addClient(client: ClientRequest): Observable<ClientResponse> {
    try {
      return this.http.post<any>(`${this.SERVER_URL}/client`, client, this.httpOptionsWithToken())
    }
    catch (error) {
      throw error;
    }
  }
  updateClient(clientId: number, client: ClientData): Observable<ClientResponse> {
    try {
      return this.http.put<any>(`${this.SERVER_URL}/client/${clientId}`, client, this.httpOptionsWithToken())
    }
    catch (error) {
      throw error;
    }
  }
  deleteClient(clientId: number): Observable<ClientResponse> {
    try {
      return this.http.delete<any>(`${this.SERVER_URL}/client/${clientId}`, this.httpOptionsWithToken())
    }
    catch (error) {
      throw error;
    }
  }
}
