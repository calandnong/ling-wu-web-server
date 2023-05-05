import type { INestApplication } from '@nestjs/common';
import { useMiddleware } from '@/common/middleware';
import useFilter from '@/common/filters';
import { useInterceptor } from '@/common/interceptors';
import { usePipes } from '@/common/pipes/index';

export function appUse(app: INestApplication) {
  // 注册过滤器
  useFilter(app);
  // 注册中间件
  useMiddleware(app);
  // 注册拦截器
  useInterceptor(app);
  // 注册管道
  usePipes(app);
}
