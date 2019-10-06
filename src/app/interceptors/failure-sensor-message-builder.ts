import {HttpErrorResponse} from '@angular/common/http';
import {Message} from 'primeng/api';

export class FailureSensorMessageBuilder {
  severity = 'error';

  buildMessage(method, err: HttpErrorResponse): Message {
    let message: Message = {} as Message;
    switch (method) {
      case 'PUT':
        return message = {severity: this.severity, summary: 'Failed update', detail: err.message};
      case 'POST':
        return message = {severity: this.severity, summary: 'Failed save', detail: err.message};
      default:
        return null;
    }
  }
}
