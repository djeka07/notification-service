import { LokiLoggerService } from '@djeka07/nestjs-loki-logger';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SessionResponse } from './session.response';
import { SessionService } from './session.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/users/user.service';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('/api/v1/sessions')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
    private readonly loggerService: LokiLoggerService,
  ) {}

  @ApiOkResponse({ type: [SessionResponse] })
  @Get()
  async getSessions(@Req() request): Promise<SessionResponse[]> {
    try {
      const user = await this.userService.findOneById(request.user.id);
      const sessions = await this.sessionService.findByUserId(user);
      return sessions?.map((session) => new SessionResponse(session, user));
    } catch (error) {
      this.loggerService.error('Could not sessions', error);
    }
  }
}
