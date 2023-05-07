import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PhoneLoginDto {
  @ApiProperty({
    description: '用户昵称',
    example: '开玩笑',
  })
  nickName: string;

  @ApiProperty({
    description: '验证码携带的token',
  })
  @IsNotEmpty({
    message: '验证码携带的token',
  })
  token: string;
}
