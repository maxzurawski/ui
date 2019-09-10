import { Injectable } from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {SuccessfulMessageBuilder} from "./successful-message-builder";
import {FailureMessageBuilder} from "./failure-message-builder";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorServiceService {

  successMsgBuilder: SuccessfulMessageBuilder;
  failureMsgBuilder: FailureMessageBuilder;

  constructor(public messageService: MessageService) {
    this.successMsgBuilder = new SuccessfulMessageBuilder();
    this.failureMsgBuilder = new FailureMessageBuilder();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap( evt => {
        if ( evt instanceof HttpResponse ) {
          const message = this.handleSuccessMessage(req.url, req.method);
          if (message !== null) {
            this.messageService.add(message);
          }
        }
      }),
      catchError( (err: any) => {
        if ( err instanceof HttpErrorResponse) {
          try {
            const message = this.handleFailureMessage(req.url, req.method, err);
            if ( message !== null ) {
              this.messageService.add(message);
            }
          } catch (e) {
            this.messageService.add({severity: 'error', summary: 'Failure', detail: e});
          }
        }
        return of(err);
      }));
  }

  handleSuccessMessage(url, method): Message {
    return this.successMsgBuilder.buildMessage(url, method);
  }

  handleFailureMessage(url, method, err: HttpErrorResponse) {
    return this.failureMsgBuilder.buildMessage(url, method, err);
  }
}
