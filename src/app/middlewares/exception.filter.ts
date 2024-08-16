import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import * as envelopeFactory from './envelope-factory';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const status = exception.getStatus();

    const body = envelopeFactory.createEnvelope(
      req.headers['x-request-id'],
      res.body,
      'Error',
      exception.message || '',
    );

    res.status(status).json(body);
  }
}
