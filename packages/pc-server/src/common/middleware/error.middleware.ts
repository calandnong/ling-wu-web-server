import { Injectable } from '@nestjs/common';
import type { NestMiddleware, Request, Response } from '@/types';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    next();
  }
}
