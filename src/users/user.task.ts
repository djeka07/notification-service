import { LokiLoggerService } from '@djeka07/nestjs-loki-logger';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';

import {
  AuthControllerClient,
  UserControllerClient,
  UserResponse,
} from './generated/user-client';
import { UserService } from './user.service';

@Injectable()
export class UserTask {
  private userApiUrl: string;
  private apiUsername: string;
  private apiPassword: string;
  private apiAppUuid: string;

  constructor(
    private readonly loggerService: LokiLoggerService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.apiUsername = this.configService.get<string>('API_USER_USERNAME');
    this.apiPassword = this.configService.get<string>('API_USER_PASSWORD');
    this.apiAppUuid = this.configService.get<string>('API_APP_UUID');
    this.userApiUrl = this.configService.get<string>('USER_API');
  }

  private async login(): Promise<string> {
    const authClient = new AuthControllerClient(
      this.userApiUrl,
      axios.create(),
    );
    const authBody = {
      email: this.apiUsername,
      password: this.apiPassword,
      applicationId: this.apiAppUuid,
    };
    const token = await authClient.auth(authBody);

    return `${token?.type} ${token?.accessToken}`;
  }

  async syncUsers(): Promise<{
    added: number;
    updated: number;
    deleted: number;
    users: UserResponse[];
  }> {
    try {
      let users = [];
      const token = await this.login();
      const userClient = new UserControllerClient(
        this.userApiUrl,
        axios.create({ headers: { authorization: token } }),
      );

      let page = 1;
      const take = 10;
      let hasNextPage = true;

      while (hasNextPage) {
        const { users: usrs, total } = await userClient.getUsers(
          undefined,
          page,
          take,
        );
        users = [...users, ...usrs];
        hasNextPage = page * take < total;
        page += 1;
      }

      const { added, updated } = await this.userService.addOrUpdateUsers(users);
      const deletedUsers = await this.userService.deleteOldUsers(users);
      return { added, deleted: deletedUsers?.length, updated, users };
    } catch (error) {
      console.log(error);
      this.loggerService.error('Error fetching users', error);
      return { added: 0, deleted: 0, updated: 0, users: [] };
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    await this.syncUsers();
  }
}
