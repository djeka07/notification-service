import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from 'src/users/user.response';
import { SessionEntity } from './session.entity';
import { UserEntity } from 'src/users/user.entity';

export class SessionResponse {
  @ApiProperty()
  sessionId: string;

  @ApiProperty({ type: UserResponse })
  user: UserResponse;

  @ApiProperty()
  applicationId: string;

  @ApiProperty()
  online: boolean;

  @ApiProperty()
  lastActive: Date;

  constructor(sessionEntity: SessionEntity, user: UserEntity) {
    this.sessionId = sessionEntity.sessionId;
    this.user = new UserResponse(user);
    this.applicationId = sessionEntity.applicationId;
    this.online = sessionEntity.online;
    this.lastActive = sessionEntity.lastActive;
  }
}
