import { Module } from '@nestjs/common';
import { MessageEvents } from './message.events';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [SocketModule],
  controllers: [],
  providers: [MessageEvents],
})
export class MessageModule {}
