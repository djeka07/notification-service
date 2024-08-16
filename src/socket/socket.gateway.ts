import { LokiLoggerService } from '@djeka07/nestjs-loki-logger';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { SessionService } from '../sessions/session.service';
import createUserApplicationRoom from './create-user-application-room';
import { SocketEvent } from './socket-event.enum';
import { ExtendedSocket } from './socket.auth';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly sessionService: SessionService,
    private readonly loggerService: LokiLoggerService,
  ) {}
  @WebSocketServer() server: Server;

  async handleConnection(client: ExtendedSocket) {
    try {
      const [session] = await Promise.all([
        this.sessionService.setUserOnline(client.session),
        this.sessionService.setOtherUserSessionsOffline(client.session),
      ]);
      const room = createUserApplicationRoom(session);
      client.join([session.applicationId, room, session?.user?.userId]);
      this.server.to(room).emit(SocketEvent.SESSION_CONNECTED, {
        sessionId: session.sessionId,
        userId: session.user?.userId,
      });
      this.loggerService.info(
        `User ${session?.user?.firstName} ${session?.user?.lastName} connected`,
      );

      const allSessions = await this.sessionService.findAllOnlineSessions();

      this.server
        .to(session.applicationId)
        .emit(SocketEvent.USERS, allSessions);
    } catch (error) {
      client.disconnect();
    }
  }

  async handleDisconnect(client: ExtendedSocket) {
    const sockets = await this.server
      .in(client.session?.user?.userId)
      .fetchSockets();
    const isDisconnected = sockets.length === 0;

    if (isDisconnected) {
      const userSession = await this.sessionService.findById(
        client.session?.sessionId,
        client.session?.user?.userId,
      );
      this.server
        .to(client?.session?.applicationId)
        .emit(SocketEvent.USER_DISCONNECTED, client.session?.user?.userId);

      if (userSession) {
        this.sessionService.setUserOffline(userSession);

        this.loggerService.info(
          `User ${userSession?.user?.firstName} ${userSession?.user?.lastName} disconnected`,
        );
      }
    }
  }
}
