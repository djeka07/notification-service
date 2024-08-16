import { LokiLoggerService } from '@djeka07/nestjs-loki-logger';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SyncUsersResponse } from './user.response';
import { UserTask } from './user.task';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Users')
@Controller('/api/v1/users')
export class UserController {
  constructor(
    private readonly userTask: UserTask,
    private readonly loggerService: LokiLoggerService,
  ) {}

  @ApiOperation({
    description: 'Sync users from user service',
    summary: 'Sync users',
  })
  @ApiOkResponse({ type: SyncUsersResponse })
  @UseGuards(AuthGuard)
  @Post()
  async syncUsers(): Promise<SyncUsersResponse> {
    const { added, deleted, updated, users } = await this.userTask.syncUsers();
    this.loggerService.verbose('Synced users', {
      total: users?.length,
      added,
      updated,
      deleted,
    });
    return { added, deleted, updated };
  }
}
