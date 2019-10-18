import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {WebsocketEvent} from "../model/WebsocketEvent";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: WebSocket;

  constructor() { }

  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);

    return new Observable(
      observer => {

        this.ws.onopen = (event) => this.sendEventToServer(false);

        this.ws.onmessage = (event) => observer.next(event.data);

        this.ws.onerror = (event) => observer.error(event);

        this.ws.onclose = (event) => observer.complete();

        return () => {
          this.sendEventToServer(true);
          this.ws.close();
        }
      }
    )
  }

  sendEventToServer(close: boolean) {
    let wsEvent = {} as WebsocketEvent;
    wsEvent.close = close;
    console.log("sending event: " + JSON.stringify(wsEvent));
    this.ws.send(JSON.stringify(wsEvent));
  }
}
