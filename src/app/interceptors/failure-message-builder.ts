import {Message} from 'primeng/api';
import {HttpErrorResponse} from '@angular/common/http';
import {FailureSensortypesMessageBuilder} from './failure-sensortypes-message-builder';
import {FailureAttributesMsgBuilder} from "./failure-attributes-message-builder";

export class FailureMessageBuilder {

  sensorTypesFailureMsgBuilder: FailureSensortypesMessageBuilder;
  attributesMsgBuilder: FailureAttributesMsgBuilder;

  constructor() {
    this.sensorTypesFailureMsgBuilder = new FailureSensortypesMessageBuilder();
    this.attributesMsgBuilder = new FailureAttributesMsgBuilder();
  }

  buildMessage(url, method, err: HttpErrorResponse): Message {
    if ( url.includes('sensortypes')) {
      return this.sensorTypesFailureMsgBuilder.buildMessage(method, err);
    }
    if ( url.includes('attributes')) {
      return this.attributesMsgBuilder.buildMessage(method, err);
    }

    return null;
  }
}
