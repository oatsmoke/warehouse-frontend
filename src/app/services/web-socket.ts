import {Injectable, signal} from '@angular/core';
import {environment} from '../../environments/environment';
import {WebSocketSubject} from 'rxjs/internal/observable/dom/WebSocketSubject';
import {webSocket} from 'rxjs/webSocket';

const url = new URL("/api/ws", environment.apiUrl)

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socket: WebSocketSubject<any>
  message = signal("")

  constructor() {
    this.socket = webSocket({
      url: url.toString()
    })

    this.socket.subscribe({
      next: (msg: string) => {
        this.message.set(msg)
      },
      error: () => {
      }
    })
  }

  send(msg:any ) {
    this.socket.next(msg)
  }
}
