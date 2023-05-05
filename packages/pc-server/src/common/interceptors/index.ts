import type { INestApplication } from '@nestjs/common';
import { ResponseInterceptor } from './response.interceptor';

export function useInterceptor(app: INestApplication) {
  // 使用响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
}
