import { ApiProperty } from '@nestjs/swagger';

export class UserTempRedis {
  code: string;
  token: string;
}

export class UserTempMessage extends UserTempRedis {
  @ApiProperty({ description: '用户临时验证码', example: '验证码' })
  code: string;

  @ApiProperty({ description: '用户验证码token', example: 'openId' })
  token: string;
}
