import {Message} from 'primeng/api';
import {HttpErrorResponse} from '@angular/common/http';

export class FailureSensortypesMessageBuilder {

  severity = 'error';

  buildMessage(method, err: HttpErrorResponse): Message {
    let message: Message = {} as Message;
    switch (method) {
      case 'PUT':
        return message = {severity: this.severity, summary: 'Failed update', detail: err.message};
      case 'POST':
        return message = {severity: this.severity, summary: 'Failed save', detail: err.message};
      case 'DELETE':
        return message = {severity: this.severity, summary: 'Failed to delete SensorType', detail: err.message};
      default:
        return null;
    }
  }
}
