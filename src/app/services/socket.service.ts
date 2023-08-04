import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environment.prod";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private SERVERURL = environment.apiUrl;
  private SOCKETURL = environment.wsUrl;

  webSocket?: WebSocket;

  constructor(private http: HttpClient) { }
  get serverUrl() {
    return this.SERVERURL;
  }

  httpOptionsWithToken(): object {
    let token: string | null = sessionStorage.getItem("token")
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  };


  connecteds$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  wsConnect() {
    const token = sessionStorage.getItem('token');
    this.webSocket = new WebSocket( this.SOCKETURL + '/logged?token=' + token, ["Sec-WebSocket-Protocol"]);
    this.webSocket.onopen = () => {
      console.log('Conexión WebSocket establecida');
      this.webSocket!.send(sessionStorage.getItem("email")!);
    };
    this.webSocket.onmessage = (event) => {
      this.connecteds$.next(JSON.parse(event.data));
    };
    this.webSocket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };
  }


  wsDisconnect() {
    this.webSocket!.close();
  }

  getConnecteds(): Observable<any>{
    return this.http.get(`${this.SERVERURL}/person/get-connecteds`, this.httpOptionsWithToken())
  }
}
