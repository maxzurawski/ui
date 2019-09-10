import {Message} from 'primeng/api';
import {HttpErrorResponse} from '@angular/common/http';
import {FailureSensortypesMessageBuilder} from './failure-sensortypes-message-builder';

export class FailureMessageBuilder {

  sensorTypesFailureMsgBuilder: FailureSensortypesMessageBuilder;

  constructor() {
    this.sensorTypesFailureMsgBuilder = new FailureSensortypesMessageBuilder();
  }

  buildMessage(url, method, err: HttpErrorResponse): Message {
    if ( url.includes('sensortypes')) {
      return this.sensorTypesFailureMsgBuilder.buildMessage(method, err);
    }

    return null;
  }
}
