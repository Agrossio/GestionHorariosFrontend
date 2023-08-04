import {Component, HostListener} from '@angular/core';
import {SocketService} from "./services/socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private isPageClosing = false;

  constructor(private socket: SocketService) {
    if(sessionStorage.getItem('token')) {
      if (!this.socket.webSocket) {
        this.socket.wsConnect()
      }
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    if (!this.isPageClosing) {
      return;
    }
    this.socket.wsDisconnect()
  }

  @HostListener('window:unload', ['$event'])
  onUnload(event: Event) {
    this.isPageClosing = true;
  }

}
