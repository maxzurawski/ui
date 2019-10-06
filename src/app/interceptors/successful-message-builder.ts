import {SuccessfulSensortypesMessageBuilder} from './successful-sensortypes-message-builder';
import {SuccessfulAttributesMessageBuilder} from "./successful-attributes-message-builder";
import {SuccessfulSensorMessageBuilder} from "./successful-sensors-message-builder";

export class SuccessfulMessageBuilder {

  sensorTypesMsgBuilder: SuccessfulSensortypesMessageBuilder;
  attributesMsgBuilder: SuccessfulAttributesMessageBuilder;
  sensorMsgBuilder: SuccessfulSensorMessageBuilder;

  constructor() {
    this.sensorTypesMsgBuilder = new SuccessfulSensortypesMessageBuilder();
    this.attributesMsgBuilder = new SuccessfulAttributesMessageBuilder();
    this.sensorMsgBuilder = new SuccessfulSensorMessageBuilder();
  }

  buildMessage(url, method) {
    if (url.includes('sensortypes')) {
      return this.sensorTypesMsgBuilder.buildMessage(method);
    }
    if (url.includes('attributes')) {
      return this.attributesMsgBuilder.buildMessage(method);
    }
    if (url.includes('register/sensors')) {
      return this.sensorMsgBuilder.buildMessage(method);
    }
    return null;
  }

}
