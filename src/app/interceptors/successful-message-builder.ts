import {SuccessfulSensortypesMessageBuilder} from './successful-sensortypes-message-builder';
import {SuccessfulAttributesMessageBuilder} from "./successful-attributes-message-builder";

export class SuccessfulMessageBuilder {

  sensorTypesMsgBuilder: SuccessfulSensortypesMessageBuilder;
  attributesMsgBuilder: SuccessfulAttributesMessageBuilder;

  constructor() {
    this.sensorTypesMsgBuilder = new SuccessfulSensortypesMessageBuilder();
    this.attributesMsgBuilder = new SuccessfulAttributesMessageBuilder();
  }

  buildMessage(url, method) {
    if (url.includes('sensortypes')) {
      return this.sensorTypesMsgBuilder.buildMessage(method);
    }
    if (url.includes('attributes')) {
      return this.attributesMsgBuilder.buildMessage(method);
    }
    return null;
  }

}
