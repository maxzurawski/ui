import {Message} from 'primeng/api';

export class SuccessfulSensortypesMessageBuilder {

  buildMessage(method) {
    let message: Message = {} as Message;
    switch (method) {
      case 'PUT':
        return message = {severity: 'success', summary: 'Successful update', detail: 'SensorType updated!'};
      case 'POST':
        return message = {severity: 'success', summary: 'Successful save', detail: 'New SensorType successfully saved!'};
      case 'DELETE':
        return message = {severity: 'success', summary: 'Successful deleted', detail: 'SensorType was deleted.'};
      default:
        return null;
    }
  }

}
