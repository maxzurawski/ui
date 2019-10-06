import {Message} from 'primeng/api';

export class SuccessfulSensorMessageBuilder {

  buildMessage(method) {
    let message: Message = {} as Message;
    switch (method) {
      case 'PUT':
        return message = {severity: 'success', summary: 'Successful update', detail: 'Sensort updated!'};
      case 'POST':
        return message = {severity: 'success', summary: 'Successful save', detail: 'New Sensor successfully saved!'};
      default:
        return null;
    }
  }
}
