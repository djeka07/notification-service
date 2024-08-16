import { Injectable } from '@nestjs/common';
import { SocketGateway } from '../socket/socket.gateway';
import { SocketEvent } from '../socket/socket-event.enum';
import { ExtendedServiceBusMessage } from 'src/app/service-bus.message';
import { isEmpty } from '../app/helpers/array';
import { MessageCreatedEvent, MessageReadEvent } from './generated/message-client';
import { LokiLoggerService } from '@djeka07/nestjs-loki-logger';
import { Subscribe } from '@djeka07/nestjs-azure-service-bus';

@Injectable()
export class MessageEvents {
  constructor(
    private readonly socketGateway: SocketGateway,
    private readonly loggerService: LokiLoggerService,
  ) {}
  @Subscribe({
    name: 'message_created',
    subscription: 'notification-service',
  })
  getMessages(eventMessage: ExtendedServiceBusMessage<MessageCreatedEvent>) {
    this.loggerService.info('Message created', eventMessage);
    if (!isEmpty(eventMessage?.body?.to) && !!eventMessage?.body?.message) {
      const {
        body: { message, to },
      } = eventMessage;

      to.filter((t) => t !== message?.from?.userId).forEach((t) => {
        this.socketGateway.server.to(t).emit(SocketEvent.MESSAGE_CREATED, message);
      });
    }
  }

  @Subscribe({
    name: 'message_read',
    subscription: 'notification-service'
  })
  messagesRead(eventMessage: ExtendedServiceBusMessage<MessageReadEvent>) {
    this.loggerService.info('Message read', eventMessage);
    if (!isEmpty(eventMessage?.body?.to) && !isEmpty(eventMessage?.body?.messages)) {
      const {
        body: { messages, to, from },
      } = eventMessage;
      

      to?.filter((t) => t !== from)?.forEach((t) => {
        this.socketGateway.server.to(t).emit(SocketEvent.MESSAGE_READ, messages);
      });
    }
  }
}
