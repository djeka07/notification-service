import { LokiLoggerService } from '@djeka07/nestjs-loki-logger';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import * as os from 'os';

const DELAYEXIT = parseInt(process.env.DELAYEXIT || '1', 10);
const HOSTNAME = os.hostname();

@Injectable()
export class ShutdownService implements OnApplicationShutdown {
  constructor(private readonly logger: LokiLoggerService) {}
  onApplicationShutdown(signal: string) {
    this.logger.verbose(`onApplicationShutdown on ${signal}, host ${HOSTNAME}`);
  }

  beforeApplicationShutdown(signal: string) {
    return new Promise(async (resolve) => {
      this.logger.verbose(
        `beforeApplicationShutdown on ${signal}, host ${HOSTNAME}`,
      );

      this.logger.verbose(
        `Waiting ${DELAYEXIT}s before exiting, host ${HOSTNAME}`,
      );
      await this.sleep(DELAYEXIT);
      this.logger.verbose(
        `Waited ${DELAYEXIT}s before exiting, host ${HOSTNAME}`,
      );
      resolve(true);
    });
  }

  sleep = async (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time * 1000));
  };
}
