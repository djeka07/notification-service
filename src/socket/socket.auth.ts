import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, Socket } from 'socket.io';

import { AuthService } from '../auth/auth.service';
import { SessionEntity } from '../sessions/session.entity';
import { SessionService } from '../sessions/session.service';
import { LokiLoggerService } from '@djeka07/nestjs-loki-logger';

export class UserSession {
  sessionId: string;
  userId: string;
  email: string;
  applicationId: string;
  connected?: boolean;
  lastOnline: number;
  name: string;
}

export type ExtendedSocket = Socket & { session: SessionEntity };

export class AuthenticatedSocketAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
    private readonly loggerService: LokiLoggerService,
  ) {
    super(app);
  }

  create(port: number, options?: any) {
    const server: Server = super.createIOServer(port, options);
    server.use(async (socket: ExtendedSocket, next) => {
      try {
        const user = await this.authService.verify(
          socket.handshake?.auth?.['authorization'],
        );

        if (!user) {
          socket.disconnect();
          return next(new Error('User not found'));
        }
        const sessionId = socket.handshake.auth.sessionId;
        const session = await this.sessionService.findById(sessionId, user.id);

        if (sessionId) {
          if (session) {
            socket.session = session;
            return next();
          }
        }
        const { id, applicationId } = user;
        const newSession = await this.sessionService.createSession({
          applicationId,
          userId: id,
        });

        socket.session = newSession;
        return next();
      } catch (error: any) {
        this.loggerService.error(error);
        return next(new Error('Authentication error'));
      }
    });
    return server;
  }
}
