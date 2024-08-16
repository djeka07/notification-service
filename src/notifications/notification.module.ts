import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { SocketModule } from '../socket/socket.module';
import { UserModule } from '../users/user.module';
import { NotificationEvents } from './notification.events';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
    SocketModule,
    UserModule,
  ],
  controllers: [],
  providers: [NotificationEvents],
  exports: [NotificationEvents],
})
export class NotificationModule {}
