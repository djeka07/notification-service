import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { AuthenticatedSocketAdapter } from './socket/socket.auth';
import compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { UserTask } from './users/user.task';
import { AuthService } from './auth/auth.service';
import { SessionService } from './sessions/session.service';
import { HttpExceptionFilter } from './app/middlewares/exception.filter';
import { LokiLoggerService } from '@djeka07/nestjs-loki-logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NotificationExtraModels } from './notifications/notification.enum';
import { SocketExtraModels } from './socket/socket-event.enum';
import { UserResponse } from './users/user.response';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    cors: true,
    bufferLogs: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('User service')
    .setDescription('A API for handling users')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [NotificationExtraModels, SocketExtraModels, UserResponse],
  });
  SwaggerModule.setup('swagger', app, document);

  const config: ConfigService = app.get(ConfigService);

  const loggerService = app.get(LokiLoggerService);
  app.use(compression());
  app.useLogger(loggerService);
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = config.get('PORT') || 3000;
  const userTasks = app.get(UserTask);
  await userTasks.syncUsers();

  await app.startAllMicroservices();
  const authService = app.get(AuthService);
  const sessionService = app.get(SessionService);
  app.useWebSocketAdapter(
    new AuthenticatedSocketAdapter(
      app,
      authService,
      sessionService,
      loggerService,
    ),
  );

  await app.listen(port, '0.0.0.0');
  loggerService.log(`Application is listening to port ${port}`);
}
bootstrap();
