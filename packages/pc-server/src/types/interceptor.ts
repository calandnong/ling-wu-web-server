import type { NestInterceptor as NestInterceptorNest } from '@nestjs/common';
import type { BaseResponse } from '@/common/response/BaseResponse';

export type NestInterceptor = NestInterceptorNest<unknown, BaseResponse>;
