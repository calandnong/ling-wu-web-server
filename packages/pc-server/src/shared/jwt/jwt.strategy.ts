import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config, useConfigService } from '@/config/configuration';
import { UserService } from '@/modules/user/user.service';
import { AuthExceptionCode, AuthException } from '@/common/exceptions/auth.exception';

export interface JWTUserInfo {
  /**
   * 用户id
   */
  id?: number;
  /**
   * 用户名
   */
  username?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    protected configService: ConfigService,
    protected userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: useConfigService(configService).get(Config.JWT).secret,
    });
  }

  /**
   * 校验payload是否正确
   * @param payload token解密后的值
   * @returns 返回Promise异常或者void
   */
  async validate(payload: JWTUserInfo): Promise<JWTUserInfo> {
    if (payload.id) {
      const userInfo = await this.userService.findById(payload.id);
      if (userInfo.username === payload.username) {
        return {
          id: userInfo.id,
          username: userInfo.username,
        };
      }
    }
    // 错误的用户令牌
    throw new AuthException(AuthExceptionCode.INVALID_TOKEN);
  }
}
