import type { INestApplication } from '@nestjs/common';
import { ResponseInterceptor } from './response.interceptor';
import { LoggingInterceptor } from './logging.interceptor';

export function useInterceptor(app: INestApplication) {
  // 使用日志时间打印拦截器
  app.useGlobalInterceptors(new LoggingInterceptor());

  // 使用响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
}
