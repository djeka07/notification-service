import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class SyncUsersResponse {
  @ApiProperty()
  added: number;
  @ApiProperty()
  updated: number;
  @ApiProperty()
  deleted: number;
}

export class UserResponse {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  online: boolean;
  @ApiProperty()
  lastActive: string;

  constructor(user: UserEntity) {
    this.userId = user.userId;
    this.email = user.email;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.online = user.online;
    this.lastActive = user.lastActive;
  }
}
