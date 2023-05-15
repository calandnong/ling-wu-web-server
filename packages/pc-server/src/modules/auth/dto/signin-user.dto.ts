import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUserDto {
  @IsString()
  @IsNotEmpty()
  // @Length(6, 20, {
  //   message: `用户名长度必须在6到20之间`,
  // })
  @ApiProperty({ description: '用户名', example: '张三' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: '密码长度必须在6到20之间，当前传递的值是：',
  })
  @ApiProperty({ description: '用户密码', example: '123456' })
  password: string;
}
