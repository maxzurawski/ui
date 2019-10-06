import {Message} from 'primeng/api';
import {HttpErrorResponse} from '@angular/common/http';
import {FailureSensortypesMessageBuilder} from './failure-sensortypes-message-builder';
import {FailureAttributesMsgBuilder} from "./failure-attributes-message-builder";
import {FailureSensorMessageBuilder} from "./failure-sensor-message-builder";

export class FailureMessageBuilder {

  sensorTypesFailureMsgBuilder: FailureSensortypesMessageBuilder;
  attributesMsgBuilder: FailureAttributesMsgBuilder;
  sensorMsgBuilder: FailureSensorMessageBuilder;

  constructor() {
    this.sensorTypesFailureMsgBuilder = new FailureSensortypesMessageBuilder();
    this.attributesMsgBuilder = new FailureAttributesMsgBuilder();
    this.sensorMsgBuilder = new FailureSensorMessageBuilder();
  }

  buildMessage(url, method, err: HttpErrorResponse): Message {
    if ( url.includes('sensortypes')) {
      return this.sensorTypesFailureMsgBuilder.buildMessage(method, err);
    }
    if ( url.includes('attributes')) {
      return this.attributesMsgBuilder.buildMessage(method, err);
    }
    if ( url.includes('register/sensors')) {
      return this.sensorMsgBuilder.buildMessage(method, err);
    }
    return null;
  }
}
