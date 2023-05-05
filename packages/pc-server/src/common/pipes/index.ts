import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from './validation.pipe';

export function usePipes(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe()); // 用来时验证生效
}
