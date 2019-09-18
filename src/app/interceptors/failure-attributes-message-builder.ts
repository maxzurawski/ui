import {Message} from 'primeng/api';
import {HttpErrorResponse} from '@angular/common/http';

export class FailureAttributesMsgBuilder {

  severity = 'error';

  buildMessage(method, err: HttpErrorResponse): Message {
    let message: Message = {} as Message;
    switch (method) {
      case 'PUT':
        return message = {severity: this.severity, summary: 'Failed update', detail: err.message};
      default:
        return null;
    }
  }
}
