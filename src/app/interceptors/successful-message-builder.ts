import {SuccessfulSensortypesMessageBuilder} from './successful-sensortypes-message-builder';

export class SuccessfulMessageBuilder {

  sensorTypesMsgBuilder: SuccessfulSensortypesMessageBuilder;

  constructor() {
    this.sensorTypesMsgBuilder = new SuccessfulSensortypesMessageBuilder();
  }

  buildMessage(url, method) {
    if (url.includes('sensortypes')) {
      return this.sensorTypesMsgBuilder.buildMessage(method);
    }
    return null;
  }

}
