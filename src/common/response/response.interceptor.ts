import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    const message = this.reflector.get<string>('message', handler) || 'ok';

    return next.handle().pipe(
      map((res) => {
        return {
          success: true,
          message,
          ...res, 
        };
      }),
    );
  }
}
