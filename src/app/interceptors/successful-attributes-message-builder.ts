import {Message} from 'primeng/api';

export class SuccessfulAttributesMessageBuilder {

  buildMessage(method) {
    let message: Message = {} as Message;
    switch (method) {
      case 'PUT':
        return message = {severity: 'success', summary: 'Successful update', detail: 'Attribute Dictionary updated!'};
      default:
        return null;
    }
  }
}
