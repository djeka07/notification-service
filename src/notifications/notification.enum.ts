import { ApiProperty } from '@nestjs/swagger';

export enum NotificationEvent {
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  MESSAGE = 'MESSAGE',
}

export class NotificationExtraModels {
  @ApiProperty({
    enum: Object.keys(NotificationEvent),
    enumName: 'NotificationEvent',
  })
  notifcation: NotificationEvent;
}
