import type { ExecutionContext } from '@nestjs/common';
import { HttpStatus, Logger, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AuthExceptionCode, AuthException } from '../exceptions/auth.exception';
import { JWT_META_KEY, JWT_CHECK_META } from '@/common/decorators/jwt.decorator';
import type { Request } from '@/types';
import type { JWTUserInfo } from '@/shared/jwt/jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const jwtMeta = this.reflector.getAllAndOverride(JWT_META_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();

    if (jwtMeta === JWT_CHECK_META.NOT_ALL_SKIP_JWT_CHECK) {
      if (request.headers.authorization) {
        return super.canActivate(context);
      }
      else {
        return true;
      }
    }

    if (jwtMeta === JWT_CHECK_META.SKIP_JWT_CHECK) return true;

    return super.canActivate(context);
  }

  handleRequest<TUser extends JWTUserInfo>(
    error: unknown,
    user: unknown,
    info: unknown,
  ): TUser {
    Logger.log('JwtAuthGuard --> handleRequest:error', error);
    Logger.log('JwtAuthGuard --> handleRequest:user', user);
    Logger.log('JwtAuthGuard --> handleRequest:info', info);
    if (info instanceof Error && info.message === 'No auth token') {
      // 用户未登录
      throw new AuthException(AuthExceptionCode.USER_NOT_LOGIN, HttpStatus.UNAUTHORIZED);
    }
    // 出现错误
    if (info) {
    // 错误的用户令牌
      throw new AuthException(AuthExceptionCode.INVALID_TOKEN);
    }

    return user as TUser;
  }
}
