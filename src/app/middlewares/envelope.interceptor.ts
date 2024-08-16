import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as envelopeFactory from './envelope-factory';

@Injectable()
export class EnvelopeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((resBody) => {
        const req = context.switchToHttp().getRequest();

        resBody = envelopeFactory.createEnvelope(
          req.headers['x-request-id'],
          resBody,
        );

        return resBody;
      }),
    );
  }
}
