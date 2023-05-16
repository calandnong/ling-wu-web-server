import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty({ name: '用户名', example: '用户名' })
  readonly username: string;

  @ApiProperty({ name: '用户密码', example: '用户密码' })
  readonly password: string;
}
