import { Controller, Get } from '@nestjs/common';
import { Uptime } from './system.models';
import { SystemService } from './system.service';

@Controller()
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get('/health')
  getHealth(): Uptime {
    return this.systemService.getUptime('health');
  }

  @Get('/ready')
  getReady(): Uptime {
    return this.systemService.getUptime('ready');
  }

  @Get('/live')
  getLive(): Uptime {
    return this.systemService.getUptime('live');
  }

  @Get('/warmup')
  getWarmup(): Uptime {
    return this.systemService.getUptime('warmup');
  }
}
