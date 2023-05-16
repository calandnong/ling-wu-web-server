import type { ExecutionContext } from '@nestjs/common';
import { SetMetadata, createParamDecorator } from '@nestjs/common';
import type { Request } from '@/types';
import type { JWTUserInfo } from '@/shared/jwt/jwt.strategy';

/**
 * 访问权限的元数据的key
 */
export const JWT_META_KEY = 'JWT_META_KEY' as const;

/**
 * jwt元数据
 */
export enum JWT_CHECK_META {
  SKIP_JWT_CHECK = 'skip-jwt-check',
  NOT_ALL_SKIP_JWT_CHECK = 'not-all-skip-jwt-check',
}

/**
 * 跳过jwt检查
 * @returns
 */
export const SkipJWTCheck = () => SetMetadata(JWT_META_KEY, JWT_CHECK_META.SKIP_JWT_CHECK);

/**
 * 跳过jwt检查时存在token的话，也尝试解析一下JWT
 */
export const NotAllSkipJwtCheck = () =>
  SetMetadata(JWT_META_KEY, JWT_CHECK_META.NOT_ALL_SKIP_JWT_CHECK);

/**
 * 获取JWT解密后注入的用户信息
 */
export const UserInfo = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user as JWTUserInfo;
  },
);
