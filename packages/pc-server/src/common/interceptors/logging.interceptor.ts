import type {
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import {
  Injectable,
} from '@nestjs/common';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import type { BaseResponse } from '@/common/response/BaseResponse';
import type { NestInterceptor } from '@/types';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<BaseResponse> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
