import type { INestApplication } from '@nestjs/common';
import { ErrorMiddleware } from './error.middleware';

export function useMiddleware(app: INestApplication) {
  // 使用中间件
  app.use(new ErrorMiddleware().use);
}
