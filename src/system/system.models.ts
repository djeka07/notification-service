export class Uptime {
  constructor(fields?: Uptime) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  prefix: string;

  hostname: string;

  uptime: string;

  timestamp: string;
}
