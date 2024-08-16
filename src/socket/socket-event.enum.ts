import { ApiProperty } from '@nestjs/swagger';

export enum SocketEvent {
  CONNECTED = 'CONNECTED',
  SESSION_CONNECTED = 'SESSION_CONNECTED',
  USERS = 'USERS',
  USER_DISCONNECTED = 'USER_DISCONNECTED',
  MESSAGE_CREATED = 'MESSAGE_CREATED',
  MESSAGE_READ = 'MESSAGE_READ'
}

export class SocketExtraModels {
  @ApiProperty({ enum: Object.keys(SocketEvent), enumName: 'SocketEvent' })
  socket: SocketEvent;
}
