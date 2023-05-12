import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUserDto {
  @IsString()
  @IsNotEmpty()
  // @Length(6, 20, {
  //   message: `用户名长度必须在6到20之间`,
  // })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: '密码长度必须在6到20之间，当前传递的值是：',
  })
  password: string;
}
