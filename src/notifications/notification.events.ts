import { Injectable } from '@nestjs/common';
import { NotificationEvent } from './notification.enum';
import { UserResponse } from 'src/users/user.response';
import { ExtendedServiceBusMessage } from 'src/app/service-bus.message';
import { AuthEvent } from 'src/users/generated/user-client';
import { LokiLoggerService } from '@djeka07/nestjs-loki-logger';
import { UserService } from 'src/users/user.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { Subscribe } from '@djeka07/nestjs-azure-service-bus';

@Injectable()
export class NotificationEvents {
  constructor(
    private readonly loggerService: LokiLoggerService,
    private readonly userService: UserService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Subscribe({
    name: 'user_logged_in',
    subscription: `notification-service`,
  })
  async userLoggedIn(eventMessage: ExtendedServiceBusMessage<AuthEvent>) {
    const { body } = eventMessage || {};
    if (body?.applicationId && body?.userId) {
      this.loggerService.log('user-logged-in', eventMessage);
      const user = await this.userService.findOneById(body.userId);
      if (user) {
        this.socketGateway.server
          .to(body.applicationId)
          .emit(NotificationEvent.USER_LOGGED_IN, new UserResponse(user));
      }
    }
  }
}
