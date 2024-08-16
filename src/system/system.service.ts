import { Injectable } from '@nestjs/common';
import { Uptime } from './system.models';
import * as os from 'os';

@Injectable()
export class SystemService {
  getUptime(prefix: string): Uptime {
    const date = new Date(process.uptime() * 1000);
    const days = date.getUTCDate() - 1;
    const hours = date.getUTCHours().toString();
    const minutes = date.getUTCMinutes().toString();
    const seconds = date.getUTCSeconds().toString();
    const milliseconds = date.getUTCMilliseconds().toString();

    const uptime = new Uptime({
      prefix,
      hostname: os.hostname(),
      // eslint-disable-next-line prettier/prettier
      uptime: `${days}.${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(
        2,
        '0'
      )}:${milliseconds.padStart(2, '0')}`,
      timestamp: new Date().toISOString(),
    });
    return uptime;
  }
}
