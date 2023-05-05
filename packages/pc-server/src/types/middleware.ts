import type { NestMiddleware as NestMiddlewareNest } from '@nestjs/common';
import type { Request, Response } from './http';

export type NestMiddleware = NestMiddlewareNest<Request, Response>;
