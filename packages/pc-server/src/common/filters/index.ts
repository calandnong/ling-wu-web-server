import type { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

export default function useFilter(app: INestApplication) {
  app.useGlobalFilters(new HttpExceptionFilter());
}
