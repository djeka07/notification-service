import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';
import { Not, Repository } from 'typeorm';
import { SessionRequest } from './session.request';
import { UserService } from '../users/user.service';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly sessionRepository: Repository<SessionEntity>,
    private readonly userService: UserService,
  ) {}

  async findById(sessionId: string, userId: string): Promise<SessionEntity> {
    try {
      const session = await this.sessionRepository
        .createQueryBuilder('session')
        .where('session.session_id = :sessionId', { sessionId })
        .andWhere('session.user.userId = :userId', { userId })
        .leftJoinAndSelect('session.user', 'user')
        .getOne();
      return session;
    } catch (e) {
      return null;
    }
  }

  async findByUserId(user: UserEntity): Promise<SessionEntity[]> {
    return this.sessionRepository.findBy({ user });
  }
  async findByNotIdUserAndApplicationId({
    user,
    applicationId,
    sessionId,
  }: {
    user: UserEntity;
    applicationId: string;
    sessionId: string;
  }): Promise<SessionEntity[]> {
    return this.sessionRepository.findBy({
      user,
      applicationId,
      sessionId: Not(sessionId),
    });
  }

  async findAllOnlineSessions(): Promise<SessionEntity[]> {
    return this.sessionRepository
      .createQueryBuilder('session')
      .where('session.online = :online', { online: 1 })
      .leftJoinAndSelect('session.user', 'user')
      .getMany();
  }

  async createSession({
    applicationId,
    userId,
  }: SessionRequest): Promise<SessionEntity> {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new BadRequestException();
    }
    const session = new SessionEntity();
    session.user = user;
    session.applicationId = applicationId;
    session.lastActive = new Date();
    return this.sessionRepository.save(session);
  }

  async setUserOnline(session: SessionEntity): Promise<SessionEntity> {
    session.online = true;
    session.lastActive = new Date();

    return this.sessionRepository.save(session);
  }

  async setOtherUserSessionsOffline(
    session: SessionEntity,
  ): Promise<SessionEntity[]> {
    const otherSessions = await this.findByNotIdUserAndApplicationId({
      user: session.user,
      applicationId: session.applicationId,
      sessionId: session.sessionId,
    });

    return await Promise.all(
      otherSessions.map((session) => {
        return this.setUserOffline(session);
      }),
    );
  }

  async setUserOffline(session: SessionEntity): Promise<SessionEntity> {
    session.online = false;
    return this.sessionRepository.save(session);
  }
}
