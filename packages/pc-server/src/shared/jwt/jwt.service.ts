import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { JWTUserInfo } from './jwt.strategy';

@Injectable()
export class AppJwtService {
  constructor(
    private jwtService: JwtService,
  ) {}

  /**
   * @description 生成token
   * @param payload 需要包含的数据
   * @param options 其他配置
   * @returns token字符串
   */
  sign(payload: JWTUserInfo, options?: Parameters<JwtService['sign']>['1']) {
    return this.jwtService.sign(payload, options);
  }
}
