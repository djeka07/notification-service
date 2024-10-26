import {
  LokiLoggerModule,
  LogLevel,
  LokiRequestLoggingInterceptor,
  LokiRequestLoggerInterceptorProvider,
} from '@djeka07/nestjs-loki-logger';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { MessageModule } from './messages/message.module';
import { NotificationEntity } from './notifications/notification.entity';
import { SessionEntity } from './sessions/session.entity';
import { SessionModule } from './sessions/session.module';
import { SocketModule } from './socket/socket.module';
import { UserEntity } from './users/user.entity';
import { UserModule } from './users/user.module';
import { SystemModule } from './system/system.module';
import { NotificationModule } from './notifications/notification.module';
import { AzureServiceBusModule } from '@djeka07/nestjs-azure-service-bus';

type Environment = 'development' | 'production';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SocketModule,
    MessageModule,
    UserModule,
    SessionModule,
    SystemModule,
    NotificationModule,
    LokiLoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        app: 'notification-service',
        host: configService.get('LOGGING_HOST'),
        userId: configService.get('LOGGING_USER_ID'),
        password: configService.get('LOGGING_PASSWORD'),
        environment: process.env.NODE_ENV as Environment,
        logLevel: LogLevel.info,
        logDev: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [UserEntity, NotificationEntity, SessionEntity],
        autoLoadEntities: true,
        synchronize: isDevelopment(),
        ssl: false,
        logger: 'advanced-console',
        logging: false,
      }),
      inject: [ConfigService],
    }),
    AzureServiceBusModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          connectionString: configService.get(
            'AZURE_SERVICE_BUS_CONNECTION_STRING',
          ),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [LokiRequestLoggerInterceptorProvider],
})
export class MainModule {}
