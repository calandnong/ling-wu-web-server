import type {
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import {
  Injectable,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import type { Observable } from 'rxjs';
import { BaseResponse } from '../response/BaseResponse';
import type { NestInterceptor } from '@/types';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseResponse> {
    // 解析ExecutionContext拿到请求体
    // const ctx = context.switchToHttp();
    // const request = ctx.getRequest();
    // 实现数据的遍历和转变
    console.log('进入全局拦截器');

    return next.handle().pipe(
      map((data) => {
        if (data instanceof BaseResponse) {
          return data;
        }
        return new BaseResponse(200, '请求成功', data);
      }),
    );
  }
}
