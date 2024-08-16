import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { SessionModule } from '../sessions/session.module';

@Module({
  imports: [AuthModule, UserModule, SessionModule],
  controllers: [],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
